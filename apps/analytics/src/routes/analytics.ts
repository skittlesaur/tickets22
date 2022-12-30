import express from 'express'
import getGeneralAnalytics from '../controllers/get-general-analytics'

const router = express.Router()

router.get('/', getGeneralAnalytics)

export default router