import { Request, Response } from 'express'
import axios from 'axios';
import { PAYMENTS_URL, TICKET_CANCELLED, TICKET_PENDING, TICKET_RESERVED } from '../../constants';
import validateTicketReservationDto from '../../validation/reservation';
import { sendKafkaMessage } from '../../connectors/kafka';
import { TicketStatus } from '@prisma/client'
import generateSeat from '../lib/generateSeat';

const startTicketCheckout = async (req: Request, res: Response) => {
  try {

    const { prisma } = req.context
    const data = req.body


    const validationError = validateTicketReservationDto(req.body);
    if (validationError) {
      return res.status(403).send(validationError.message);
    }
    // @todo: check out user context to see if use, if it is insert userId and email if available
    // if not just use email

    const user = req.context.user
    const userId = user?.id

    // @todo: check available tickets if tickets are available and price right
    // @todo: split the controller to 3 seperate controllers depndning on what happens

    // @todo: create many depending on amout of tickets, save ticket ids in an array and pass it using stripe

    let ticketIds: string[] = []

    for (let i = 0; i < data.tickets.quantity; i++) {

      const ticket = await prisma.reservedTicket.create({
        data: {
          userId: userId,
          email: data.email,
          matchNumber: data.matchNumber,
          price: data.ticket.price,
          category: data.ticket.category,
          status: TicketStatus.PENDING,
          seatPosition: data.seatPosition,
          seatRow: generateSeat(data.ticket.category).seatRow,
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

    // Perform Stripe Payment Flow (axios call to /payments)
    const stripeCharge = await axios.post(`${PAYMENTS_URL}/payments/`, { data: data, ticketIds: ticketIds })

    // Return success response to client
    res.status(200).json({ message: 'Ticket Purchase Successful', });
  } catch (e: any) {
    return res.status(400).json({ message: e.message });
  }
};

export default startTicketCheckout