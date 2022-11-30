import express from 'express'
import emailValid from '../controllers/auth/email-valid'
import signup from '../controllers/auth/signup'
import login from '../controllers/auth/login'

const router = express.Router()

router.post('/email-valid', emailValid)
router.post('/signup', signup)
router.post('/login', login)

export default router