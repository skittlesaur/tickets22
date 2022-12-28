import { Request, Response } from 'express'
import * as bodyParser from 'body-parser';
import { TICKET_RESERVED } from '../../constants';
import { sendKafkaMessage } from '../../connectors/kafka';

const reserveTickets = async (req: Request, res: Response) => {
  try {

    const message = req.body.message.body

    await sendKafkaMessage(TICKET_RESERVED, {
      meta: { action: TICKET_RESERVED },
      body: {
        matchNumber: message.matchNumber,
        tickets: message.tickets,
      }
    })

    res.status(200).json({ message: 'Ticket Purchase Successful' })
  } catch (e: any) {
    return res.status(500).json({ message: e.message });
  }
}

export default reserveTickets