import { Request, Response } from 'express'
import axios from 'axios';
import { RESERVATIONS_URL } from '../constants';

const webhook = async (req: Request, res: Response) => {
  try {

    const eventType = req.body.type;
    let formattedData = {}
    const { data, ticketIds } = req.body.data.object.metadata;

    switch (req.body.type) {
      case ('charge.succeeded'):
        console.log(eventType)

        formattedData = {
          data: JSON.parse(data),
          ticketIds: JSON.parse(ticketIds),
        }

        console.log('formatted data: ', formattedData)

        await axios.post(`${RESERVATIONS_URL}/tickets/finalize`, formattedData);
        break

      case ('charge.expired'):
        console.log(eventType)

        formattedData = {
          data: JSON.parse(data),
          ticketIds: JSON.parse(ticketIds),
        }

        console.log('formatted data: ', formattedData)

        await axios.post(`${RESERVATIONS_URL}/tickets/expire`, formattedData);
        break

      case ('charge.failed'):
        console.log(eventType)

        formattedData = {
          data: JSON.parse(data),
          ticketIds: JSON.parse(ticketIds),
        }

        console.log('formatted data: ', formattedData)

        await axios.post(`${RESERVATIONS_URL}/tickets/cancel`, formattedData);
        break

      default:
        console.log('not accepted event type: ', eventType)
        return
    }

    return res.status(200).json(formattedData)
  } catch (error: any) {
    console.log('webhook', error)
    res.status(404).json({ message: error.message });
  }
};

export default webhook