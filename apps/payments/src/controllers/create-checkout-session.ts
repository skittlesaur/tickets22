import { Request, Response } from 'express'
import { stripe } from '../index';
import { CLIENT_URL } from '../constants';

const createCheckoutSession = async (req: Request, res: Response) => {
  try {

    console.log(req)



    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: 'payment',
      expires_at: 600,
      line_items: {

      },
      success_url: `${CLIENT_URL}`
    })

    res.status(200).json()

  } catch (e: any) {
    res.status(500).json({ error: e.message })
  }
}

export default createCheckoutSession