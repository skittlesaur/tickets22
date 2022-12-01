import express from 'express'
import getMatches from '../controllers/matches/get-matches/get-matches'

const router = express.Router()

router.get('/', getMatches)

export default router