import express from 'express'
import authenticatedUser from '../middlewares/authenticated-user'
import getUser from '../controllers/auth/get-user'

const router = express.Router()

router.use(authenticatedUser)

router.get('', getUser)

export default router