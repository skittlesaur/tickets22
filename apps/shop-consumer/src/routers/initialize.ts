import express from 'express'
import initilaize from '../lib/initialize/initialize';

const router = express.Router()

router.get('/', initilaize)

export default router