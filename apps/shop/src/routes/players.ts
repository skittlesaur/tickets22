import express from 'express'
import getRandomPlayer from '../controllers/players/random-player'

const router = express.Router()

router.get('/team/:teamId', getRandomPlayer)

export default router