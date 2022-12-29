import { Request, Response } from 'express'
import axios from 'axios';
import { PAYMENTS_URL, TICKET_CANCELLED, TICKET_PENDING, TICKET_RESERVED } from '../../constants';
import validateTicketReservationDto from '../../validation/reservation';
import { sendKafkaMessage } from '../../connectors/kafka';
import { TicketStatus } from '@prisma/client'
import generateSeat from '../lib/generateSeat';
import seatPosition from '../processors/seat-position';

interface reservation {
  email: string,
  matchNumber: number,
  SeatPosition: seatPosition,
  tickets: {
    category: number
    quantity: number,
    price: number
  }
  ipAddress?: string
}

const startTicketCheckout = async (req: Request, res: Response) => {
  try {

    const { prisma } = req.context
    const data = req.body // :reservation


    // const validationError = validateTicketReservationDto(req.body);
    // if (validationError) {
    //   return res.status(403).send(validationError.message);
    // }

    const user = req.context.user
    const userId = user?.id

    const check = await prisma.availableTickets.findFirst({
      where: {
        matchNumber: data.matchNumber,
        category: data.tickets.category
      },
      select: {
        available: true,
        pending: true,
        price: true
      }
    })

    if (!check) throw new Error('These tickets dont exist')

    if (data.tickets.quantity > check?.available) throw new Error(`The quantity you ordered isnt available, only ${check.available} tickets left`)

    if (check.pending + data.tickets.quantity > check.available) throw new Error(`There are ${check.pending} purchases pending out of ${check.available} tickets available, please try again later`)

    if (data.tickets.price !== check.price) throw new Error('The price of these tickets is invalid')

    let ticketIds: string[] = []

    for (let i = 0; i < data.tickets.quantity; i++) {

      const ticket = await prisma.reservedTicket.create({
        data: {
          userId: userId,
          email: data.email,
          matchNumber: data.matchNumber,
          price: data.tickets.price,
          category: data.tickets.category,
          status: TicketStatus.PENDING,
          seatPosition: data.seatPosition,
          seatRow: generateSeat(data.tickets.category).seatRow,
          seatNumber: Math.floor(Math.random() * (100 - 1) + 1),
        }
      })

      ticketIds.push(ticket.id)
    }

    await sendKafkaMessage(TICKET_PENDING, {
      meta: { action: TICKET_PENDING },
      body: {
        matchNumber: data.matchNumber,
        tickets: data.tickets,
      }
    });

    const stripeSession = await axios.post(`${PAYMENTS_URL}/payments/`, { data: data, ticketIds: ticketIds })

    res.status(200).json({ url: stripeSession.data.url });
  } catch (e: any) {
    return res.status(400).json({ message: e.message });
  }
};

export default startTicketCheckout