import { Request, Response } from 'express'
import { JWT_SECRET, SECURITY_URL } from '../../constants'
import jwt from 'jsonwebtoken'

const requestAccess = async (req: Request, res: Response) => {
  try {
    const { email } = req.body

    if (!email) {
      return res.status(400).json({
        message: 'Email is required',
      })
    }

    const token = jwt.sign({ email }, JWT_SECRET, {
      expiresIn: '10m',
    })

    const url = `${SECURITY_URL}/verify/request-access/${token}`

    console.log(url)
    return res.status(200)
  } catch (e) {

  }
}

export default requestAccess