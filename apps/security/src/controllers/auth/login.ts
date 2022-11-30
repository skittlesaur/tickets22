import { Request, Response } from 'express'
import validateEmail from '../../lib/validate-email'
import StatusCode from '../../lib/status-code'
import bcrypt from 'bcrypt'
import createToken from '../../lib/create-token'

const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body
    const { prisma } = req.context

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

    // check if email exists
    const user = await prisma.user.findFirst({
      where: {
        email,
      },
      select: {
        id: true,
        password: true,
      },
    })

    if (!user) {
      return res.status(400).send({
        status: 400,
        code: StatusCode[400],
        message: 'Email does not exist',
        field: 'email',
      })
    }

    // compare password
    const isPasswordValid = await bcrypt.compare(password, user.password)
    if (!isPasswordValid) {
      return res.status(400).send({
        status: 400,
        code: StatusCode[400],
        message: 'Invalid password',
        field: 'password',
      })
    }

    // create token
    const token = createToken(user)

    // set cookie
    res.cookie('access', token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 7,
    })

    return res.status(200).json({
      success: true,
    })
  } catch (e) {
    console.log(e)
  }
}

export default login