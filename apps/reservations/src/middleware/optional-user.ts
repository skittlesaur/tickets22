import { NextFunction, Request, Response } from 'express'
import axios from 'axios'
import { SECURITY_URL } from '../constants'

const optionalUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { data } = await axios.get(`${SECURITY_URL}/me`, {
      headers: {
        cookie: req.headers.cookie,
      },
    })

    req.context.user = data
    next()
  } catch (e: any) {
    next()
  }
}

export default optionalUser