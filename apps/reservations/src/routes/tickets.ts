import express from 'express'
import getAvailableTickets from '../controllers/tickets/get-available-tickets'
import processPendingTicket from '../controllers/proccesors/process-pending-ticket'
import processCancelledTicket from '../controllers/proccesors/process-cancelled-ticket'
import processReservedTicket from '../controllers/proccesors/process-reserved-ticket'
import reserveTickets from '../controllers/tickets/reserve-tickets'

const router = express.Router()

router.get('/match/:id/available', getAvailableTickets)
router.post('/proccesors/pending', processPendingTicket)
router.post('/proccesors/cancelled', processCancelledTicket)
router.post('/proccesors/reserved', processReservedTicket)

router.post('/reserve', reserveTickets)

export default router