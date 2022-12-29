import express from 'express'
import getAvailableTickets from '../controllers/tickets/get-available-tickets'
import processPendingTicket from '../controllers/processors/process-pending-ticket'
import processCancelledTicket from '../controllers/processors/process-cancelled-ticket'
import processReservedTicket from '../controllers/processors/process-reserved-ticket'
import reserveTickets from '../controllers/tickets/reserve-tickets'
import startTicketCheckout from '../controllers/tickets/start-ticket-checkout'
import cancelTickets from '../controllers/tickets/cancel-tickets';
import optionalUser from '../middleware/optional-user';
import timeoutTickets from '../controllers/tickets/timeout-tickets';
import updateMasterlist from '../controllers/processors/update-masterlist';


const router = express.Router()

router.get('/match/:id/available', getAvailableTickets)
router.post('/processors/pending', processPendingTicket)
router.post('/processors/cancelled', processCancelledTicket)
router.post('/processors/reserved', processReservedTicket)
router.post('/processors/update', updateMasterlist)

router.post('/cancel', cancelTickets)
router.post('/expired', timeoutTickets)
router.post('/finalize', reserveTickets)

router.post('/reserve', optionalUser, startTicketCheckout)



export default router