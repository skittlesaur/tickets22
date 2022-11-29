import { Request, Response } from 'express'
import StatusCode from '../../lib/status-code'

const emailValid = async (req: Request, res: Response) => {
  try {
    const { email, type } = req.body
    const { prisma } = req.context

    const user = await prisma.user.findFirst({
      where: {
        email: email.toLowerCase(),
      },
    })

    if (type === 'signup' && user)
      return res.status(400).json({
        status: 400,
        code: StatusCode[400],
        message: 'Email already exists',
        valid: false,
      })

    if (type === 'login' && !user)
      return res.status(400).json({
        status: 400,
        code: StatusCode[400],
        message: 'Email does not exist',
        valid: false,
      })

    return res.status(200).json({
      status: 200,
      code: StatusCode[200],
      valid: true,
    })

  } catch (err) {
  }
}

export default emailValid