import express from 'express'
import requestAccess from '../controllers/verify/request-access'
import requestAccessCallback from '../controllers/verify/request-access-callback'

const router = express.Router()

router.post('/request-access', requestAccess)
router.get('/request-access/:token', requestAccessCallback)

export default router
