import dotenv from 'dotenv'
dotenv.config()

export const PORT = process.env.PORT ?? 3000

export const CLIENT_URL = process.env.CLIENT_URL ?? 'http://localhost:9000'
export const SHOP_URL = process.env.SHOP_URL ?? 'http://localhost:3000'
export const SHOP_CONSUMER_URL = process.env.SHOP_CONSUMER_URL ?? 'http://localhost:3010'
export const RESERVATIONS_URL = process.env.RESERVATIONS_URL ?? 'http://localhost:3020'
export const ANALYTICS_URL = process.env.ANALYTICS_URL ?? 'http://localhost:3030'
export const PAYMENTS_URL = process.env.PAYMENTS_URL ?? 'http://localhost:3040'
export const SECURITY_URL = process.env.SECURITY_URL ?? 'http://localhost:3050'