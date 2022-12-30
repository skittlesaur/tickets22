import { Request, Response } from 'express'
import { JWT_SECRET } from '../constants'
import jwt from 'jsonwebtoken'

const decode = async (req: Request, res: Response) => {
  try {
    const { token } = req.params
    const decoded = jwt.verify(token, JWT_SECRET)
    return res.status(200).json(decoded)
  } catch (e: any) {
    return res.status(500).json({
      message: e.message,
    })
  }
}

export default decode