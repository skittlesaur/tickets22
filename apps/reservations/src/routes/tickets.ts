import express from 'express'
import getAvailableTickets from '../controllers/tickets/get-available-tickets'
import processPendingTicket from '../controllers/processors/process-pending-ticket'
import processCancelledTicket from '../controllers/processors/process-cancelled-ticket'
import processReservedTicket from '../controllers/processors/process-reserved-ticket'
import reserveTickets from '../controllers/tickets/start-ticket-checkout'
import startTicketCheckout from '../controllers/tickets/start-ticket-checkout'
import cancelTickets from '../controllers/tickets/cancel-tickets';

const router = express.Router()

router.get('/match/:id/available', getAvailableTickets)
router.post('/processors/pending', processPendingTicket)
router.post('/processors/cancelled', processCancelledTicket)
router.post('/processors/reserved', processReservedTicket)

router.post('/cancel', cancelTickets)
router.post('/finalize', reserveTickets)

router.post('/reserve', startTicketCheckout)

export default router