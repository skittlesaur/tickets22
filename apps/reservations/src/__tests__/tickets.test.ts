import { PrismaClient, TicketStatus } from '@prisma/client'
import supertest from 'supertest'
import app from '../index'
import errorDefaults from './error-defaults'

const prisma = new PrismaClient()

describe('tickets', () => {
  describe('get available tickets', () => {
    describe('given a valid id', () => {
      it('should return a list of available tickets', async () => {
        const match = await prisma.match.findFirst({
          where: {
            ended: false,
          },
        })

        if (!match)
          throw new Error('No available match found')


        const res = await supertest(app).get(`/tickets/match/${match.matchNumber}/available`)

        expect(res.status).toBe(200)

        expect(res.body).toHaveLength(3)

        for (let i = 0; i < 3; i++) {
          expect(res.body[i]).toHaveProperty('id')
          expect(res.body[i]).toHaveProperty('matchNumber')
          expect(res.body[i]).toHaveProperty('category')
          expect(res.body[i]).toHaveProperty('available')
          expect(res.body[i]).toHaveProperty('pending')
          expect(res.body[i]).toHaveProperty('price')

          expect(res.body[i].matchNumber).toEqual(match.matchNumber)
          expect(res.body[i].category).toEqual(i + 1)
          expect(res.body[i].available).toBeGreaterThanOrEqual(0)
          expect(res.body[i].pending).toBeGreaterThanOrEqual(0)
          expect(res.body[i].price).toBeGreaterThanOrEqual(0)
        }
      })
    })

    describe('given an invalid numeric id', () => {
      it('should return a 400 error', async () => {
        const res = await supertest(app).get(`/tickets/match/0/available`)

        expect(res.status).toEqual(404)
        errorDefaults(res.body)
      })
    })

    describe('given an invalid string id', () => {
      it('should return a 400 error', async () => {
        const res = await supertest(app).get(`/tickets/match/invalid/available`)

        expect(res.status).toEqual(400)
        errorDefaults(res.body)
      })
    })

    describe('given a valid id but the match has ended', () => {
      it('should return a 400 error', async () => {
        const match = await prisma.match.findFirst({
          where: {
            ended: true,
          },
        })

        if (!match)
          throw new Error('No available match found')

        const res = await supertest(app).get(`/tickets/match/${match.matchNumber}/available`)

        expect(res.status).toEqual(400)
        errorDefaults(res.body)
      })
    })
  })

  describe('get user tickets', () => {
    describe('given a valid user authentication', () => {
      it('should return a list of tickets', async () => {
        // find user where reservedTickets is not empty
        const user = await prisma.user.findFirst({
          where: {
            reservedTickets: {
              some: {},
            },
          },
        })

        if (!user)
          throw new Error('No user found')

        const tickets = await prisma.reservedTicket.findMany({
          where: {
            OR: [
              {
                userId: user.id,
              },
              {
                email: user.email,
              },
            ],
          },
        })

        const res = await supertest(app).get(`/tickets`).set('Authorization', `Bearer ${user.apiKey}`)
        expect(res.status).toEqual(200)
        expect(res.body.userTickets).toHaveLength(tickets.length)

        tickets.forEach((ticket) => {
          const ticketRes = res.body.userTickets.find((t: any) => t.id === ticket.id)

          expect(ticketRes).toHaveProperty('id')
          expect(ticketRes).toHaveProperty('userId')
          expect(ticketRes).toHaveProperty('price')
          expect(ticketRes).toHaveProperty('createdAt')
          expect(ticketRes).toHaveProperty('status')
          expect(ticketRes).toHaveProperty('ipAddress')
          expect(ticketRes).toHaveProperty('email')
          expect(ticketRes).toHaveProperty('match')

          expect(ticketRes.id).toEqual(ticket.id)
          expect(ticketRes.userId).toEqual(ticket.userId)
          expect(ticketRes.price).toEqual(ticket.price)
          expect(ticketRes.createdAt).toEqual(ticket.createdAt.toISOString())
          expect(ticketRes.status).toEqual(ticket.status)
          expect(ticketRes.ipAddress).toEqual(ticket.ipAddress)
          expect(ticketRes.email).toEqual(ticket.email)

          expect(ticketRes.match).toHaveProperty('matchNumber')
          expect(ticketRes.match).toHaveProperty('homeTeam')
          expect(ticketRes.match).toHaveProperty('awayTeam')
          expect(ticketRes.match).toHaveProperty('date')
        })
      })
    })

    describe('given an invalid user authentication', () => {
      it('should return a 200 with an empty userTickets array', async () => {
        const res = await supertest(app).get(`/tickets`).set('Authorization', `Bearer invalid`)
        expect(res.status).toEqual(200)
        expect(res.body.userTickets).toHaveLength(0)
      })
    })

    describe('given a valid user ip address', () => {
      it('should return a list of tickets', async () => {
        const ticket = await prisma.reservedTicket.findFirst({
          where: {
            ipAddress: {
              not: null,
            },
          },
        })

        if (!ticket || !ticket.ipAddress)
          throw new Error('No ip found')

        const res = await supertest(app).get(`/tickets`).set('X-Forwarded-For', ticket.ipAddress)
        expect(res.status).toEqual(200)

        const ticketRes = res.body.guestTickets.find((t: any) => t.id === ticket.id)

        expect(ticketRes).toHaveProperty('id')
        expect(ticketRes).toHaveProperty('userId')
        expect(ticketRes).toHaveProperty('price')
        expect(ticketRes).toHaveProperty('createdAt')
        expect(ticketRes).toHaveProperty('status')
        expect(ticketRes).toHaveProperty('ipAddress')
        expect(ticketRes).toHaveProperty('email')
        expect(ticketRes).toHaveProperty('match')

        expect(ticketRes.id).toEqual(ticket.id)
        expect(ticketRes.userId).toEqual(ticket.userId)
        expect(ticketRes.price).toEqual(ticket.price)
        expect(ticketRes.createdAt).toEqual(ticket.createdAt.toISOString())
        expect(ticketRes.status).toEqual(ticket.status)
        expect(ticketRes.ipAddress).toEqual(ticket.ipAddress)
        expect(ticketRes.email).toEqual(ticket.email)
      })
    })

    describe('given an invalid user ip address', () => {
      it('should return a 200 with an empty guestTickets array', async () => {
        const res = await supertest(app).get(`/tickets`).set('X-Forwarded-For', 'invalid')
        expect(res.status).toEqual(200)
        expect(res.body.guestTickets).toHaveLength(0)
      })
    })
  })

  describe('get user ticket', () => {
    describe('given a valid user authentication', () => {
      it('should return a ticket', async () => {
        const user = await prisma.user.findFirst({
          where: {
            reservedTickets: {
              some: {},
            },
          },
        })

        if (!user)
          throw new Error('No user found')

        const ticket = await prisma.reservedTicket.findFirst({
          where: {
            OR: [
              {
                userId: user.id,
              },
              {
                email: user.email,
              },
            ],
          },
        })

        if (!ticket)
          throw new Error('No ticket found')

        const res = await supertest(app).get(`/tickets/${ticket.id}`).set('Authorization', `Bearer ${user.apiKey}`)

        expect(res.status).toEqual(200)
      })
    })

    describe('given an invalid ticket id', () => {
      it('should return a 404', async () => {
        const res = await supertest(app).get(`/tickets/invalid`)

        expect(res.status).toEqual(404)
        errorDefaults(res.body)
      })
    })

    describe('given an invalid user authentication', () => {
      it('should return a 404', async () => {
        const ticket = await prisma.reservedTicket.findFirst({
          where: {
            status: TicketStatus.PURCHASED,
          },
        })

        if (!ticket)
          throw new Error('No ticket found')

        const res = await supertest(app).get(`/tickets/${ticket.id}`).set('Authorization', 'Bearer invalid')

        expect(res.status).toEqual(403)
        errorDefaults(res.body)
      })
    })
  })
})