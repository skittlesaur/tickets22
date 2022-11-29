export const ErrorStatusCode: { [key: number]: string } = {
  400: 'Bad Request',
  401: 'Unauthorized',
  403: 'Forbidden',
  404: 'Not Found',
  500: 'Internal Server Error',
  501: 'Not Implemented',
  502: 'Bad Gateway',
  503: 'Service Unavailable',
  504: 'Gateway Timeout',
}

class AppError extends Error {
  status: number
  stack?: string

  constructor(message: string, status: 400 | 401 | 403 | 404 | 500 | 501 | 502 | 503 | 504, stack?: string) {
    super(message)
    this.status = status
    this.stack = stack
  }

  toString() {
    return `${this.status}: ${this.message} ${this.stack !== undefined ? `\n${this.stack}` : ''}`
  }
}

export default AppError