import express from 'express'
import initilaize from '../lib/adder/initialize';

const router = express.Router()

router.get('/', initilaize)

export default router