import supertest from 'supertest'
import server from '../index'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

describe('tickets', () => {
  describe('finalize', () => {
    it('finalizes a ticket purchase to a match and lists it as reserved', async () => {
      await supertest(server).post('/finalize').expect(200)

    })
  })
})