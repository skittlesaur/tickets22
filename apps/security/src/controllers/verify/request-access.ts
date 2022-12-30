import { Request, Response } from 'express'
import { JWT_SECRET, SECURITY_URL } from '../../constants'
import jwt from 'jsonwebtoken'
import sendEmail from '../../lib/emails/send-email'
import requestAccessHTML from '../../lib/emails/templates/request-access/html'
import requestAccessText from '../../lib/emails/templates/request-access/text'

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
    const ipAddress = req.headers['x-forwarded-for'] || req.socket.remoteAddress
    const variables = {
      url,
      ip: ipAddress,
    }

    await sendEmail(
      'Request Access',
      email,
      requestAccessHTML(variables),
      requestAccessText(variables),
    )
    return res.status(200).json({
      message: 'Email sent',
      success: true,
    })
  } catch (e) {
    console.log(e)
  }
}

export default requestAccess