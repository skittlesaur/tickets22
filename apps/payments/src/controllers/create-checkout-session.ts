import { Request, Response } from 'express'
import { stripe } from '../index'
import { CLIENT_URL, RESERVATIONS_URL, SECURE_ENDPOINT_SECRET } from '../constants'
import axios from 'axios'

const createCheckoutSession = async (req: Request, res: Response) => {
  try {
    const { data } = req.body
    const { ticketIds } = req.body

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      line_items: ticketIds.map(() => {
        return {
          price_data: {
            currency: 'usd',
            product_data: {
              name: `${data.match.homeTeam.name} vs ${data.match.awayTeam.name} - Category ${data.tickets.category} Ticket`,
            },
            unit_amount: data.tickets.price * 100,
          },
          quantity: 1,
        }
      }),
      customer_email: data.email,
      payment_intent_data: {
        metadata: {
          data: JSON.stringify(data),
          ticketIds: JSON.stringify(ticketIds),
        },
      },
      success_url: `${CLIENT_URL}/tickets`,
      cancel_url: `${CLIENT_URL}/tickets/cancel?data=${JSON.stringify(data)}&ticketIds=${JSON.stringify(ticketIds)}`,
    })

    await axios.post(`${RESERVATIONS_URL}/tickets/${SECURE_ENDPOINT_SECRET}/stripe-urls`, {
      ticketIds,
      url: session.url,
    })

    res.status(201).json({ url: session.url })
  } catch (e: any) {
    console.log(e)
    res.status(500).json({ error: e })
  }
}

export default createCheckoutSession