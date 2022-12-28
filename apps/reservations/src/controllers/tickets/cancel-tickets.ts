import { Request, Response } from 'express'
import { sendKafkaMessage } from '../../connectors/kafka';
import { TICKET_CANCELLED } from '../../constants';

const cancelTickets = async (req: Request, res: Response) => {
  try {

    const message = req.body.message.body

    await sendKafkaMessage(TICKET_CANCELLED, {
      meta: { action: TICKET_CANCELLED },
      body: {
        matchNumber: message.matchNumber,
        tickets: message.tickets,
      }
    });

    res.status(200).json('Message to cancel tickets has been sent')

  } catch (e: any) {
    res.status(500).json({ message: e.message })
  }
}

export default cancelTickets