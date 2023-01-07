import supertest from 'supertest'
import app from '../index'
import checkErrorDefaults from './error-defaults'

describe('matches', () => {
  describe('get all matches', () => {
    it('should return a list of matches', async () => {
      const res = await supertest(app).get('/matches')

      expect(res.status).toBe(200)
      expect(res.body).toHaveLength(64)

      const match = res.body[0]

      expect(match).toHaveProperty('matchNumber')
      expect(match).toHaveProperty('roundNumber')
      expect(match).toHaveProperty('date')
      expect(match).toHaveProperty('stadium')
      expect(match).toHaveProperty('homeTeam')
      expect(match).toHaveProperty('homeScore')
      expect(match).toHaveProperty('awayTeam')
      expect(match).toHaveProperty('awayScore')
      expect(match).toHaveProperty('group')
      expect(match).toHaveProperty('ended')

      expect(match.stadium).toHaveProperty('id')
      expect(match.stadium).toHaveProperty('name')

      expect(match.homeTeam).toHaveProperty('id')
      expect(match.homeTeam).toHaveProperty('name')

      expect(match.awayTeam).toHaveProperty('id')
      expect(match.awayTeam).toHaveProperty('name')
    })
  })

  describe('get upcoming matches', () => {
    it('should return upcoming matches', async () => {
      const res = await supertest(app).get('/matches/upcoming')

      expect(res.status).toBe(200)
      expect(res.body).toHaveLength(4)

      const match = res.body[0]

      expect(match).toHaveProperty('matchNumber')
      expect(match).toHaveProperty('roundNumber')
      expect(match).toHaveProperty('date')
      expect(match).toHaveProperty('homeTeam')
      expect(match).toHaveProperty('awayTeam')
      expect(match).toHaveProperty('group')

      expect(match.homeTeam).toHaveProperty('id')
      expect(match.homeTeam).toHaveProperty('name')

      expect(match.awayTeam).toHaveProperty('id')
      expect(match.awayTeam).toHaveProperty('name')
    })
  })

  describe('get match', () => {
    describe('given a valid id', () => {
      it('should return a match', async () => {
        const res = await supertest(app).get('/matches/1')

        expect(res.status).toBe(200)

        const match = res.body

        expect(match).toHaveProperty('matchNumber')
        expect(match).toHaveProperty('roundNumber')
        expect(match).toHaveProperty('date')
        expect(match).toHaveProperty('stadium')
        expect(match).toHaveProperty('homeTeam')
        expect(match).toHaveProperty('homeScore')
        expect(match).toHaveProperty('awayTeam')
        expect(match).toHaveProperty('awayScore')
        expect(match).toHaveProperty('group')
        expect(match).toHaveProperty('ended')

        expect(match.stadium).toHaveProperty('id')
        expect(match.stadium).toHaveProperty('name')

        expect(match.homeTeam).toHaveProperty('id')
        expect(match.homeTeam).toHaveProperty('name')

        expect(match.awayTeam).toHaveProperty('id')
        expect(match.awayTeam).toHaveProperty('name')
      })
    })

    describe('given an invalid non numerical id', () => {
      it('should return a 400 error', async () => {
        const res = await supertest(app).get('/matches/invalid')

        expect(res.status).toBe(400)
        checkErrorDefaults(res.body)
      })
    })

    describe('given a non existing id', () => {
      it('should return a 404 error', async () => {
        const res = await supertest(app).get('/matches/100')

        expect(res.status).toBe(404)
        checkErrorDefaults(res.body)
      })
    })
  })

  describe('get match summary', () => {
    describe('given a valid id', () => {
      it('should return a match summary', async () => {
        const res = await supertest(app).get('/matches/1/summary')

        expect(res.status).toBe(200)
        expect(res.body.length).toBeGreaterThan(0)

        const event = res.body[0]

        expect(event).toHaveProperty('id')
        expect(event).toHaveProperty('eventType')
        expect(event).toHaveProperty('minute')
        expect(event).toHaveProperty('description')
        expect(event).toHaveProperty('awayScore')
        expect(event).toHaveProperty('homeScore')
        expect(event).toHaveProperty('team')
      })
    })

    describe('given an invalid non numerical id', () => {
      it('should return a 400 error', async () => {
        const res = await supertest(app).get('/matches/invalid/summary')

        expect(res.status).toBe(400)
        checkErrorDefaults(res.body)
      })
    })

    describe('given a non existing id', () => {
      it('should return a 404 error', async () => {
        const res = await supertest(app).get('/matches/100/summary')

        expect(res.status).toBe(404)
        checkErrorDefaults(res.body)
      })
    })

    describe('given a match with no summary', () => {
      it('should return an empty array', async () => {
        const res = await supertest(app).get('/matches/30/summary')

        expect(res.status).toBe(200)
        expect(res.body).toHaveLength(0)
      })
    })
  })
})