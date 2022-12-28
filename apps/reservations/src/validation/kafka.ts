const Joi = require("@hapi/joi");
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
      price: number
    }
  }
}

/**
 * Validate schema for pending/reserved/cancelled ticket
 * @return null if validation passes otherwise a validation error
 */
const kafkaMessage = (reservation: message) => {
  var schema = Joi.object()
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
          tickets: Joi.object().keys({
            category: Joi.number().strict().valid(1, 2, 3).required(),
            quantity: Joi.number().strict().min(1).max(2).required(),
            price: Joi.number().strict().valid(75, 125, 195).required(),
          }).required(),
        })
        .unknown(false),
    })
    .required();
  return schema.validate(reservation).error;
}

export default kafkaMessage
