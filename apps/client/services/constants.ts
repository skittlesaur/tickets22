export interface DefaultMutationProps {
  onSuccess?: (data: any) => void
  onError?: (error: any) => void
  onSettled?: () => void
}

export const SECURITY_SERVICE_URL = process.env.NODE_PUBLIC_SECURITY_SERVICE_URL ?? 'http://localhost:3050'