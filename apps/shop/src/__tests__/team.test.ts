import supertest from 'supertest'
import server from '../index'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

describe('team', () => {
  describe('get all teams', () => {
    it('should return all teams', async () => {
      await supertest(server).get('/team').expect(200)
    })
  })

  describe('get team', () => {
    describe('given a valid team name', () => {
      it('should return the team', async () => {
        const usaRecord = await prisma.team.findFirst({
          where: {
            name: 'USA',
          },
        })

        const { body, statusCode } = await supertest(server).get('/team/usa')
        expect(statusCode).toBe(200)
        expect(body).toEqual(usaRecord)
      })
    })
    describe('given an invalid team name', () => {
      it('should return a 404', async () => {
        await supertest(server).get('/team/invalid-team').expect(404)
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

        const { body, statusCode } = await supertest(server).get(`/team/${team.id}/matches`)
        expect(statusCode).toBe(200)
        expect(body.length).toBeGreaterThanOrEqual(3)
      })
    })
    describe('given an invalid team id', () => {
      it('should return a 404', async () => {
        await supertest(server).get('/team/invalid-id/matches').expect(404)
      })
    })
  })
})