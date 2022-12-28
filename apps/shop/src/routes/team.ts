import express from 'express'
import getRandomPlayer from '../controllers/players/random-player'

const router = express.Router()

router.get('/:teamId/players/random', getRandomPlayer)

export default router