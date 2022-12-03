import express from 'express'
import getStadium from '../controllers/stadiums/get-stadium'

const router = express.Router()

router.get('/:id', getStadium)

export default router