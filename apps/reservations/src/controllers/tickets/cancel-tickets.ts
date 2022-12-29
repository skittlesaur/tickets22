import { Request, Response } from 'express'
import { sendKafkaMessage } from '../../connectors/kafka';
import { TICKET_CANCELLED } from '../../constants';
import { TicketStatus } from '@prisma/client';

const cancelTickets = async (req: Request, res: Response) => {
  try {

    const { prisma } = req.context
    const data = JSON.parse(req.body)
    console.log('cancel', data)

    await sendKafkaMessage(TICKET_CANCELLED, {
      meta: { action: TICKET_CANCELLED },
      body: {
        matchNumber: data.matchNumber,
        tickets: data.tickets,
      }
    });

    for (let i = 0; i < data.tickets.quantity; i++) {

      const ticket = await prisma.reservedTicket.update({
        where: {
          id: data.ticketsIds[i]
        },
        data: {
          status: TicketStatus.CANCELLED,
        }
      })
    }

    res.status(200).json('Message to cancel tickets has been sent')

  } catch (e: any) {
    res.status(500).json({ message: e.message })
  }
}

export default cancelTickets