import express from "express";
import createCheckoutSession from '../controllers/create-checkout-session';
import webhook from '../controllers/webhook';

const router = express.Router()

router.post('/', createCheckoutSession)
router.post('/webhook', webhook)

export default router