import { Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import { CLIENT_URL, JWT_SECRET, RESERVATIONS_URL, SECURE_ENDPOINT_SECRET } from '../../constants'
import axios from 'axios'

const requestAccessCallback = async (req: Request, res: Response) => {
  try {
    const { token } = req.params
    const decoded: any = jwt.verify(token, JWT_SECRET)

    if (!decoded)
      return res.redirect(`${CLIENT_URL}?error=Failed to decode token`)

    const { email } = decoded

    const { data: tickets } = await axios.post(`${RESERVATIONS_URL}/tickets/${SECURE_ENDPOINT_SECRET}`, {
      email,
      select: {
        id: true,
      },
    })

    const ticketsEncoded = jwt.sign({ tickets }, JWT_SECRET, {
      expiresIn: '1d',
    })

    res.cookie('tickets', ticketsEncoded, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24,
    })

    res.redirect(`${CLIENT_URL}/tickets`)
  } catch (e) {

  }
}

export default requestAccessCallback