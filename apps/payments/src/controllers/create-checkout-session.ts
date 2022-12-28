import { Request, Response } from 'express'
import { stripe } from '../index';
import { CLIENT_URL } from '../constants';

const createCheckoutSession = async (req: Request, res: Response) => {
  try {

    const { data } = req.body
    const { ticketIds } = req.body

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: 'payment',
      currency: 'usd',
      expires_at: 600,
      line_items: [
        { price: data.tickets.price, quantity: data.tickets.quantity }
      ],
      customer_email: data.email,
      payment_intent_data: {
        metadata: {

        }
      },
      success_url: `${CLIENT_URL}`
    })

    res.status(200).json()

  } catch (e: any) {
    res.status(500).json({ error: e.message })
  }
}

export default createCheckoutSession