import express from 'express'
import getMatches from '../controllers/matches/get-matches'
import getMatch from '../controllers/matches/get-match'

const router = express.Router()

router.get('/', getMatches)
router.get('/:id', getMatch)

export default router