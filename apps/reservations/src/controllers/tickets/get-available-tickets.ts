import { Request, Response } from 'express'
import axios from 'axios'
import { SHOP_URL } from '../../constants'

const getAvailableTickets = async (req: Request, res: Response) => {
  try {
    const { id } = req.params

    const { data: match } = await axios.get(`${SHOP_URL}/matches/${id}`)
    const { id: stadiumId } = match.stadium

    // get stadium capacity
    const { data: stadium } = await axios.get(`${SHOP_URL}/stadiums/${stadiumId}`)
    const { capacity: stadiumCapacity } = stadium

    // get tickets sold
    const ticketsSold = await req.context.prisma.reservedTicket.count({
      where: {
        matchId: id,
      },
    })

    const availableTickets = stadiumCapacity - ticketsSold

    res.status(200).json({ availableTickets })
  } catch (e: any) {
    if (e.isAxiosError) {
      const { data, status } = e.response
      res.status(status).json(data)
    }
  }
}

export default getAvailableTickets