import express from 'express'
import getMatches from '../controllers/matches/get-matches'
import getMatch from '../controllers/matches/get-match'
import getMatchSummary from '../controllers/matches/get-match-summary'

const router = express.Router()

router.get('/', getMatches)
router.get('/:id', getMatch)
router.get('/:id/summary', getMatchSummary)

export default router