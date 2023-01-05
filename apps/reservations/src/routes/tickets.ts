import express from 'express'
import getAvailableTickets from '../controllers/tickets/get-available-tickets'
import processPendingTicket from '../controllers/processors/process-pending-ticket'
import processCancelledTicket from '../controllers/processors/process-cancelled-ticket'
import processReservedTicket from '../controllers/processors/process-reserved-ticket'
import reserveTickets from '../controllers/tickets/reserve-tickets'
import startTicketCheckout from '../controllers/tickets/start-ticket-checkout'
import cancelTickets from '../controllers/tickets/cancel-tickets'
import optionalUser from '../middleware/optional-user'
import timeoutTickets from '../controllers/tickets/timeout-tickets'
import updateMasterlist from '../controllers/processors/update-masterlist'
import getReservedTicket from '../controllers/tickets/get-reserved-ticket'
import userTickets from '../controllers/tickets/user-tickets'
import secureUserTickets from '../controllers/tickets/secure-user-tickets'
import { SECURE_ENDPOINT_SECRET } from '../constants'

const router = express.Router()

router.get('/', optionalUser, userTickets)
router.get('/:id', optionalUser, getReservedTicket)
router.post(`/${SECURE_ENDPOINT_SECRET}`, secureUserTickets)
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