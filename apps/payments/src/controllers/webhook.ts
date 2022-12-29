import { Request, Response } from 'express'
import axios from 'axios';
import { RESERVATIONS_URL } from '../constants';

const webhook = async (req: Request, res: Response) => {
  try {

    console.log(req.body)
    const eventType = req.body.type;
    if (eventType === 'charge.succeeded') {
      console.log('meta data', req.body.data.object.metadata)
    }
    const { metadata } = req.body.data.object;

    switch (eventType) {
      case ('charge.succeeded'):
        await axios.post(`${RESERVATIONS_URL}/tickets/finalize`, { data: metadata });
        break
      case ('charge.expired'):
        await axios.post(`${RESERVATIONS_URL}/tickets/expired`, { data: metadata });
        break
      case ('charge.failed'):
        await axios.post(`${RESERVATIONS_URL}/tickets/cancel`, { data: metadata });
        break
      default:
        break
    }

    res.status(200).json(metadata);
  } catch (error: any) {
    console.log('lol');
    console.log('webhook', error)
    res.status(404).json({ message: error.message });
  }
};

export default webhook