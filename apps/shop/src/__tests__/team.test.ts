import supertest from 'supertest'
import app from '../index'
import { PrismaClient } from '@prisma/client'
import checkErrorDefaults from './error-defaults'

const prisma = new PrismaClient()

describe('team', () => {
  describe('get all teams', () => {
    it('should return all teams', async () => {
      const { body, statusCode } = await supertest(app).get('/team')
      expect(statusCode).toBe(200)
      expect(body.length).toBeGreaterThan(0)
      expect(body[0].id).toBeDefined()
      expect(body[0].name).toBeDefined()
    })
  })

  describe('get team', () => {
    describe('given a valid team name', () => {
      it('should return the team', async () => {
        const usaRecord: any = await prisma.team.findFirst({
          where: {
            name: 'USA',
          },
        })

        const { body, statusCode } = await supertest(app).get('/team/usa')
        expect(statusCode).toBe(200)
        Object.keys(body).forEach(key => {
          expect(body[key]).toEqual(usaRecord[key])
        })
        expect(body.name).toBeDefined()
        expect(body.primaryColor).toBeDefined()
        expect(body.secondaryColor).toBeDefined()
      })
    })
    describe('given an invalid team name', () => {
      it('should return a 404', async () => {
        const res = await supertest(app).get('/team/invalid-team')
        expect(res.status).toBe(404)
        checkErrorDefaults(res.body)
      })
    })
  })

  describe('get team games', () => {
    describe('given a valid team id', () => {
      it('should return at least 3 matches', async () => {
        const team = await prisma.team.findFirst({
          select: {
            id: true,
          },
        })

        if (!team)
          throw new Error('No team found')

        const { body, statusCode } = await supertest(app).get(`/team/${team.id}/matches`)
        expect(statusCode).toBe(200)
        expect(body.length).toBeGreaterThanOrEqual(3)
      })
    })
    describe('given an invalid team id', () => {
      it('should return a 404', async () => {
        const res = await supertest(app).get('/team/invalid-id/matches')
        expect(res.status).toBe(404)
        checkErrorDefaults(res.body)
      })
    })
  })
})