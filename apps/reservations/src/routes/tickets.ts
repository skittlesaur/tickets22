import express from 'express'
import getAvailableTickets from '../controllers/tickets/get-available-tickets'

const router = express.Router()

router.get('/match/:id/available', getAvailableTickets)

export default router