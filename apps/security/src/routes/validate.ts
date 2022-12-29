import express from 'express'
import validateTicket from '../controllers/validate/ticket'
import optionalUser from '../middlewares/optional-user'

const router = express.Router()

router.post('/ticket', optionalUser, validateTicket)

export default router