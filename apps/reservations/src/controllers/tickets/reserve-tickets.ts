import { Request, Response } from 'express'
import * as bodyParser from 'body-parser';
import { TICKET_RESERVED } from '../../constants';
import { sendKafkaMessage } from '../../connectors/kafka';
import { TicketStatus } from '@prisma/client';

const reserveTickets = async (req: Request, res: Response) => {
  try {

    const { prisma } = req.context
    const { data, ticketIds } = req.body

    console.log('data: ', data, 'ticketIds: ', ticketIds)

    await sendKafkaMessage(TICKET_RESERVED, {
      meta: { action: TICKET_RESERVED },
      body: {
        matchNumber: data.matchNumber,
        tickets: data.tickets,
      }
    })

    for (let i = 0; i < data.tickets.quantity; i++) {

      const ticket = await prisma.reservedTicket.update({
        where: {
          id: ticketIds[i]
        },
        data: {
          status: TicketStatus.PURCHASED,
        }
      })
    }

    res.status(200).json('Message to reserve tickets has been sent')
  } catch (e: any) {
    console.log('reserve-ticket error', e)
    return res.status(500).json({ message: e.message });
  }
}

export default reserveTickets