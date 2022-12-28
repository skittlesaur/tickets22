import { Request, Response } from 'express'
import axios from 'axios';
import { PAYMENTS_URL, TICKET_CANCELLED, TICKET_PENDING, TICKET_RESERVED } from '../../constants';
import validateTicketReservationDto from '../../validation/reservation';
import { sendKafkaMessage } from '../../connectors/kafka';

const startTicketCheckout = async (req: Request, res: Response) => {
  try {

    const validationError = validateTicketReservationDto(req.body);
    if (validationError) {
      return res.status(403).send(validationError.message);
    }
    // @todo: check out user context to see if use, if it is insert userId and email if available
    // if not just use email

    const message = req.body.message.body

    // @todo: check available tickets if tickets are available and price right
    // @todo: split the controller to 3 seperate controllers depndning on what happens

    // @todo: create many depending on amout of tickets, save ticket ids in an array and pass it using stripe

    for (let i = 0; i < message.tickets.quantity i++) {
      const tickets = await req.context.prisma.reservedTicket.create({
        data: {
          email: message.email,
          matchNumber: message.matchNumber,
          price: message.ticket.


      }
      })
    }

    await sendKafkaMessage(TICKET_PENDING, {
      meta: { action: TICKET_PENDING },
      body: {
        matchNumber: message.matchNumber,
        tickets: message.tickets,
      }
    });

    //make ticket

    console.log('this is what Im giving to the stripe', req.body)
    // Perform Stripe Payment Flow (axios call to /payments)
    const stripeCharge = await axios.post(`${PAYMENTS_URL}/payments/`, req.body)

    // Persist ticket sale in database with a generated reference id so user can lookup ticket
    // add ticket to reservedTickets

    // Return success response to client
    res.status(200).json({ message: 'Ticket Purchase Successful', });
  } catch (e: any) {
    return res.status(400).json({ message: e.message });
  }
};

export default startTicketCheckout