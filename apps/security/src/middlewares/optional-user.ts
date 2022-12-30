import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import { JWT_SECRET } from '../constants'

const optionalUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.cookies?.['access'] ?? req.headers.authorization?.split(' ')?.[1]
    if (!token)
      return next()

    const decoded: any = jwt.verify(token, JWT_SECRET)

    if (!decoded)
      return next()

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
      return next()

    req.context.user = user
    next()
  } catch (e) {
    next()
  }
}

export default optionalUser