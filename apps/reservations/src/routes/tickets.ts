import express from 'express'
import getAvailableTickets from '../controllers/tickets/get-available-tickets'
import processPendingTicket from '../controllers/processors/process-pending-ticket'
import processCancelledTicket from '../controllers/processors/process-cancelled-ticket'
import processReservedTicket from '../controllers/processors/process-reserved-ticket'
import reserveTickets from '../controllers/tickets/reserve-tickets'
import updateMasterlist from '../controllers/processors/update-masterlist'

const router = express.Router()

router.get('/match/:id/available', getAvailableTickets)
router.post('/processors/pending', processPendingTicket)
router.post('/processors/cancelled', processCancelledTicket)
router.post('/processors/reserved', processReservedTicket)

router.post('/processors/masterlist', updateMasterlist)

router.post('/reserve', reserveTickets)



export default router