import express from 'express'
import getGame from '../controllers/game/get-game'

const router = express.Router()

router.get('/', getGame)

export default router