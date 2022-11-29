import { Request, Response } from 'express'
import StatusCode from '../../lib/status-code'

const getUser = async (req: Request, res: Response) => {
  try {
    const { user } = req.context

    if (!user)
      return res.status(401).send({
        status: 401,
        code: StatusCode[401],
        message: 'Unauthorized',
      })

    res.status(200).send(user)
  } catch (e) {
    console.log(e)
  }
}

export default getUser