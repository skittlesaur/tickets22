import { Request, Response } from 'express'
import AppError, { ErrorStatusCode } from '../lib/app-error'

const ErrorHandler = (err: AppError | Error, req: Request, res: Response) => {
  if (process.env.NODE_ENV !== 'production') {
    console.error(`× ${req.method} ${req.originalUrl} ${err}`)
  }
  if (err instanceof AppError)
    return res.status(err.status).json({
      status: err.status,
      code: ErrorStatusCode[err.status],
      message: err.message,
    })

  return res.status(500).json({
    status: 500,
    code: ErrorStatusCode[500],
    message: err.message,
  })
}

export default ErrorHandler