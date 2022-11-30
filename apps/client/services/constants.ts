export interface DefaultMutationProps {
  onSuccess?: (data: any) => void
  onError?: (error: any) => void
  onSettled?: () => void
}

export const SHOP_SERVICE_URL = process.env.NEXT_PUBLIC_SHOP_SERVICE_URL ?? 'http://localhost:3000'
export const SHOP_CONSUMER_SERVICE_URL = process.env.NEXT_PUBLIC_SHOP_CONSUMER_SERVICE_URL ?? 'http://localhost:3010'
export const RESERVATIONS_SERVICE_URL = process.env.NEXT_PUBLIC_RESERVATIONS_SERVICE_URL ?? 'http://localhost:3020'
export const ANALYTICS_SERVICE_URL = process.env.NEXT_PUBLIC_ANALYTICS_SERVICE_URL ?? 'http://localhost:3030'
export const PAYMENTS_SERVICE_URL = process.env.NEXT_PUBLIC_PAYMENTS_SERVICE_URL ?? 'http://localhost:3040'
export const SECURITY_SERVICE_URL = process.env.NEXT_PUBLIC_SECURITY_SERVICE_URL ?? 'http://localhost:3050'