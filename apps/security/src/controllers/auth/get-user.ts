import { Request, Response } from 'express'
import StatusCode from '../../lib/status-code'

const getUser = async (req: Request, res: Response) => {
  try {
    const { user } = req.context

    if (!user)
      return res.status(401).json({
        status: 401,
        code: StatusCode[401],
        message: 'Unauthorized',
      })

    return res.status(200).json(user)
  } catch (e) {
    return res.status(500).json({
      status: 500,
      code: StatusCode[500],
      message: 'Internal Server Error',
    })
  }
}

export default getUser