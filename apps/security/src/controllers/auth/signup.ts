import { Request, Response } from 'express'
import validateEmail from '../../lib/validate-email'
import StatusCode from '../../lib/status-code'
import bcrypt from 'bcrypt'
import hat from 'hat'
import createToken from '../../lib/create-token'

const signup = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body

    // validate email
    const isEmailValid = validateEmail(email)
    if (!isEmailValid) {
      return res.status(400).send({
        status: 400,
        code: StatusCode[400],
        message: 'Invalid email',
        field: 'email',
      })
    }

    // validate password
    if (password.length < 8) {
      return res.status(400).send({
        status: 400,
        code: StatusCode[400],
        message: 'Password must be at least 8 characters',
        field: 'password',
      })
    }

    // check if email already exists
    const isAlreadyUser = await req.context.prisma.user.findFirst({
      where: {
        email,
      },
    })

    if (isAlreadyUser) {
      return res.status(400).send({
        status: 400,
        code: StatusCode[400],
        message: 'Email already exists, please login instead',
        field: 'email',
      })
    }

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10)

    // create user
    const user = await req.context.prisma.user.create({
      data: {
        email: email.toLowerCase(),
        password: hashedPassword,
        verificationToken: hat(),
        apiKey: hat(),
      },
      select: {
        id: true,
        email: true,
      },
    })

    const token = createToken(user)

    res.cookie('access', token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 7,
    })

    return res.status(201).json({
      status: 201,
      code: StatusCode[201],
      message: 'User created',
      data: {
        ...user,
      },
    })
  } catch (e) {
    console.log(e)
  }
}

export default signup