import { NextFunction, Request, Response } from 'express'
import axios from 'axios'
import { SECURITY_URL } from '../constants'

const authenticatedUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { data } = await axios.get(`${SECURITY_URL}/me`, {
      headers: {
        Authorization: req.headers.authorization,
        cookie: req.headers.cookie,
      },
    })

    req.context.user = data
    next()
  } catch (e) {
    return res.status(401).json({
      status: 401,
      code: 'UNAUTHORIZED',
      message: 'Unauthorized',
    })
  }
}

export default authenticatedUser