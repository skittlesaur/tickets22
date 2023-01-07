import supertest from 'supertest'
import app from '../index'
import { PrismaClient } from '@prisma/client'
import checkErrorDefaults from './error-defaults'

const prisma = new PrismaClient()

describe('stadiums', () => {
  describe('get stadium by id', () => {
    describe('given a valid stadium id', () => {
      it('should return the stadium', async () => {
        const stadium: any = await prisma.stadium.findFirst()

        if (!stadium)
          throw new Error('No stadium found')

        const { body, statusCode } = await supertest(app).get(`/stadiums/${stadium.id}`)
        expect(statusCode).toBe(200)
        Object.keys(body).forEach(key => {
          expect(body[key]).toEqual(stadium[key])
        })
      })
    })
    describe('given an invalid stadium id', () => {
      it('should return a 404', async () => {
        const res = await supertest(app).get('/stadiums/invalid-id')
        expect(res.status).toBe(404)
        checkErrorDefaults(res.body)
      })
    })
  })
})