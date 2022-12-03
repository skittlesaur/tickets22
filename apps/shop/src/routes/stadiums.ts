import express from 'express'
import getStadium from "../controllers/stadiums/get-stadium"

const router = express.Router()

router.get('/', (req, res) => { return res.status(200).json({ 'message': 'root' }) })
router.get('/:id', getStadium)

export default router