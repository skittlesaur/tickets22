import { NextFunction, Request, Response } from 'express'

const getGame = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // implementation
  } catch (err) {
    next(err)
  }
}

export default getGame