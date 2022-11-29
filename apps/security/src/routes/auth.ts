import express from 'express'
import emailValid from '../controllers/auth/email-valid'
import signup from '../controllers/auth/signup'

const router = express.Router()

router.post('/email-valid', emailValid)
router.post('/signup', signup)

export default router