import express from "express";
import createCharge from '../controllers/create-charge';

const router = express.Router()

router.post('/', createCharge)

export default router