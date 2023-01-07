import { Request, Response, NextFunction } from 'express'
import StatusCode from '../lib/status-code'
import jwt from 'jsonwebtoken'
import { JWT_SECRET } from '../constants'

const authenticatedUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.cookies?.['access'] ?? req.headers.authorization?.split(' ')?.[1]
    if (!token)
      return res.status(400).send({
        status: 400,
        code: StatusCode[400],
        message: 'Token was not supplied',
      })

    const userApi = await req.context.prisma.user.findFirst({
      where: {
        apiKey: token,
      },
      select: {
        id: true,
        email: true,
        phone: true,
        apiKey: true,
      },
    })

    if (userApi) {
      req.context.user = userApi
      return next()
    }

    const decoded: any = jwt.verify(token, JWT_SECRET)

    if (!decoded)
      return res.status(401).send({
        status: 401,
        code: StatusCode[401],
        message: 'Token verification failure, the token may have expired',
      })

    const user = await req.context.prisma.user.findFirst({
      where: {
        id: decoded.id,
      },
      select: {
        id: true,
        email: true,
        phone: true,
        apiKey: true,
      },
    })

    if (!user)
      return res.status(401).send({
        status: 401,
        code: StatusCode[401],
        message: 'Invalid user id in the token',
      })

    req.context.user = user
    next()
  } catch (e) {
    res.status(500).json({
      status: 500,
      code: StatusCode[500],
      message: 'Something went wrong',
    })
  }
}

export default authenticatedUser