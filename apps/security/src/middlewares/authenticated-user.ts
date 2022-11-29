import { Request, Response, NextFunction } from 'express'
import StatusCode from '../lib/status-code'
import jwt from 'jsonwebtoken'
import { JWT_SECRET } from '../constants'

const authenticatedUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization?.split(' ')?.[1] ?? req.cookies?.['access']
    if (!token)
      return res.status(401).send({
        status: 401,
        code: StatusCode[401],
        message: 'Unauthorized',
      })

    const decoded: any = jwt.verify(token, JWT_SECRET)

    if (!decoded)
      return res.status(401).send({
        status: 401,
        code: StatusCode[401],
        message: 'Unauthorized',
      })

    const user = await req.context.prisma.user.findFirst({
      where: {
        id: decoded.id,
      },
      select: {
        id: true,
        email: true,
        phone: true,
      },
    })

    if (!user)
      return res.status(401).send({
        status: 401,
        code: StatusCode[401],
        message: 'Unauthorized',
      })

    req.context.user = user
    next()
  } catch (e) {
    res.status(401).json({
      status: 401,
      code: StatusCode[401],
      message: 'Unauthorized',
    })
  }
}

export default authenticatedUser