import { Request, Response } from 'express'
import { stripe } from '../index';
import { CLIENT_URL } from '../constants';

const createCheckoutSession = async (req: Request, res: Response) => {
  try {

    console.log(req)

    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      success_url: `${CLIENT_URL}`
    })

    // const token = await stripe.tokens.create({
    //   card: {
    //     number: req.body.card.number,
    //     exp_month: req.body.card.expirationMonth,
    //     exp_year: req.body.card.expirationYear,
    //     cvc: req.body.card.cvc,
    //   },
    // });

    // const charge = await stripe.charges.create({
    //   amount: req.body.message.body.tickets.quantity * req.body.message.body.tickets.price,
    //   currency: 'usd',
    //   source: token.id,
    //   description: 'FIFA World Cup Ticket Reservation',
    // })

    // console.log(charge)

    res.status(200).json()

  } catch (e: any) {
    res.status(500).json({ error: e.message })
  }
}

export default createCheckoutSession