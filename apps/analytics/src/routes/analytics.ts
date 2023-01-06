import express from 'express'
import getGeneralAnalytics from '../controllers/get-general-analytics'
import getTopSellingMatches from '../controllers/get-top-selling-matches';
import getRecommendations from '../controllers/get-recommendations';

const router = express.Router()

router.get('/', getGeneralAnalytics)
router.get('/matches', getTopSellingMatches)
router.get('/recommendations', getRecommendations)

export default router