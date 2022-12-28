import { Request, Response } from 'express'
import axios from 'axios';
import { RESERVATIONS_URL } from '../constants';

const webhook = async (req: Request, res: Response) => {
  const eventType = req.body.type;
  const { metadata } = req.body.data.object;

  try {
    switch (eventType) {
      case ('charge.succeeded'):
        await axios.post(`${RESERVATIONS_URL}/tickets/finalize`, /* {data: metadata} */);
        break
      case ('charge.expired'):
        await axios.post(`${RESERVATIONS_URL}/tickets/cancel`, /* {data: metadata} */);
        break
      case ('charge.failed'):
        await axios.post(`${RESERVATIONS_URL}/tickets/cancel`, /* {data: metadata} */);
        break
    }

    res.status(200).json(metadata);
  } catch (error: any) {
    res.status(404).json({ message: error.message });
  }
};

export default webhook