import express from 'express'
import emailValid from '../controllers/auth/email-valid'
import signup from '../controllers/auth/signup'
import authenticatedUser from '../middlewares/authenticated-user'
import getUser from '../controllers/auth/get-user'

const router = express.Router()

router.post('/email-valid', emailValid)
router.post('/signup', signup)

router.use(authenticatedUser)

router.get('/me', getUser)

export default router