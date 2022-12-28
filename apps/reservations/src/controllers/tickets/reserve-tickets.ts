import { Request, Response } from 'express'
import axios from 'axios';
import { PAYMENTS_URL, TICKET_CANCELLED, TICKET_PENDING, TICKET_RESERVED } from '../../constants';
import validateTicketReservationDto from '../../validation/reservation';
import { sendKafkaMessage } from '../../connectors/kafka';

const reserveTickets = async (req: Request, res: Response) => {
  try {

    // @todo: see req.user if user is logged in and get email based on that   

    const validationError = validateTicketReservationDto(req.body);
    if (validationError) {
      return res.status(403).send(validationError.message);
    }

    // @todo: check the available tickets first if tickets are available and price is accurate 

    const message = req.body.message

    await sendKafkaMessage(TICKET_PENDING, {
      meta: { action: TICKET_PENDING },
      body: {
        matchNumber: message.body.matchNumber,
        tickets: message.body.tickets,
      }
    });

    console.log('this is what Im giving to the stripe', req.body)
    // Perform Stripe Payment Flow (axios call to /payments)
    try {
      // const stripeCharge = await axios.post(
      //   `${PAYMENTS_URL}/payments/`,
      //   req.body
      // );

      throw new Error('not rn')

      await sendKafkaMessage(TICKET_RESERVED, {
        meta: { action: TICKET_RESERVED },
        body: {
          matchNumber: message.body.matchNumber,
          tickets: message.body.tickets,
        }
      });


    } catch (stripeError: any) {
      // Send cancellation message indicating ticket sale failed

      await sendKafkaMessage(TICKET_CANCELLED, {
        meta: { action: TICKET_CANCELLED },
        body: {
          matchNumber: req.body.message.body.matchNumber,
          tickets: req.body.message.body.tickets,
        }
      });

      return res.status(400).send(`could not process payment: ${stripeError.message}`);
    }

    // Persist ticket sale in database with a generated reference id so user can lookup ticket
    // add ticket to reservedTickets

    // Return success response to client
    res.status(200).json({
      message: 'Ticket Purchase Successful',
    });
  } catch (e: any) {
    return res.status(400).send(e.message);
  }
};

export default reserveTickets