import Joi from 'joi';

import {
  TICKET_RESERVED,
  TICKET_PENDING,
  TICKET_CANCELLED,
} from "../constants";

interface message {
  meta: {
    action: string
  },
  body: {
    matchNumber: number,
    tickets: {
      category: number,
      quantity: number,
      price: number,
    }
  }
}

/**
 * Validate schema for pending/reserved/cancelled ticket
 * @return null if validation passes otherwise a validation error
 */
export const kafkaMessage = (reservation: message) => {
  const schema = Joi.object()
    .keys({
      meta: Joi.object()
        .keys({
          action: Joi.string()
            .valid(TICKET_RESERVED, TICKET_PENDING, TICKET_CANCELLED)
            .required(),
        })
        .unknown(false),
      body: Joi.object()
        .keys({
          matchNumber: Joi.number().required(),
          tickets: Joi.object()
            .keys({
              category: Joi.number().strict().valid(1, 2, 3).required(),
              quantity: Joi.number().strict().min(1).max(2).required(),
              price: Joi.number().strict().valid(75, 125, 195).required(),
            })
            .required(),
        })
        .required(),
    })
    .required()
    .unknown(false);
  return schema.validate(reservation).error;
}

/**
 * Validate schema for masterlist object
 * @return null if validation passes otherwise a validation error
 */
interface tickets {
  available: number,
  pending: number,
  price: number
}
interface masterList {
  matchNumber: number,
  roundNumber: number,
  dateUtc: string,
  location: string,
  availability: {
    category1: tickets,
    category2: tickets,
    category3: tickets,
    homeTeam: string,
    awayTeam: string,
    group?: string
  }
}


export const kafkaMasterlistMessage = (matchInfo: object) => {
  const schema = Joi.object()
    .keys({
      matchNumber: Joi.number().strict().required(),
      roundNumber: Joi.number().strict().required(),
      dateUtc: Joi.string().required(),
      location: Joi.string().required(),
      availability: Joi.object().keys({
        category1: Joi.object()
          .keys({
            available: Joi.number().strict().required(),
            pending: Joi.number().strict().min(0).required(),
            price: Joi.number().strict().valid(75, 125, 195).required(),
          })
          .required(),
        category2: Joi.object()
          .keys({
            available: Joi.number().strict().required(),
            pending: Joi.number().strict().min(0).required(),
            price: Joi.number().strict().valid(75, 125, 195).required(),
          })
          .required(),
        category3: Joi.object()
          .keys({
            available: Joi.number().strict().required(),
            pending: Joi.number().strict().min(0).required(),
            price: Joi.number().strict().valid(75, 125, 195).required(),
          })
          .required(),
      }),
      homeTeam: Joi.string().required(),
      awayTeam: Joi.string().required(),
      group: Joi.string().required(),
    })
    .required()
    .unknown(false);
  return schema.validate(matchInfo).error;
}

