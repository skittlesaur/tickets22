import { Request, Response } from 'express'
const { validateTicketReservationDto } = require('../../validation/reservation');
const messages = require('../../constants');
import axios from 'axios';
import { PAYMENTS_URL } from '../../constants';
const { sendKafkaMessage } = require('../../connectors/kafka');

const reserveTickets = async (req: Request, res: Response) => {
  try {
    // validate payload before proceeding with reservations
    const validationError = validateTicketReservationDto(req.body);
    if (validationError) {
      return res.status(403).send(validationError.message);
    }

    // Send message indicating ticket is pending checkout
    // so shop consumers can process message and call
    // sp-shop-api to decrement available ticket count

    const message = req.body.message

    await sendKafkaMessage(messages.TICKET_PENDING, {
      meta: { action: messages.TICKET_PENDING },
      body: {
        matchNumber: message.body.matchNumber,
        tickets: message.body.tickets,
      }
    });

    console.log('this is what Im giving to the stripe', req.body)
    // Perform Stripe Payment Flow (axios call to /payments)
    try {
      const stripeCharge = await axios.post(
        `${PAYMENTS_URL}/payments/`,
        req.body
      );

      await sendKafkaMessage(messages.TICKET_RESERVED, {
        meta: { action: messages.TICKET_RESERVED },
        body: {
          matchNumber: message.body.matchNumber,
          tickets: message.body.tickets,
        }
      });


    } catch (stripeError: any) {
      // Send cancellation message indicating ticket sale failed

      await sendKafkaMessage(messages.TICKET_CANCELLED, {
        meta: { action: messages.TICKET_CANCELLED },
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