import express from 'express'
import getGeneralAnalytics from '../controllers/get-general-analytics'
import getTopSellingMatches from '../controllers/get-top-selling-matches'
import getRecommendations from '../controllers/get-recommendations'
import getMatchAnalytics from '../controllers/get-match-analytics'
import getAllMatchesAnalytics from '../controllers/get-all-matches-analytics'

const router = express.Router()

router.get('/', getGeneralAnalytics)
router.get('/matches', getAllMatchesAnalytics)
router.get('/matches/:matchNumber', getMatchAnalytics)
router.get('/matches/top', getTopSellingMatches)
router.get('/recommendations', getRecommendations)

export default router