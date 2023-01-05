import express from 'express'
import getGeneralAnalytics from '../controllers/get-general-analytics'
import getTopSellingMatches from '../controllers/get-top-selling-matches';

const router = express.Router()

router.get('/', getGeneralAnalytics)
router.get('/matches', getTopSellingMatches)

export default router