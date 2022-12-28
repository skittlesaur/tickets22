const Joi = require("@hapi/joi");

const { tickets } = require("./shared-schema");

interface reservation {
  email: string,
  card: {
    number: string,
    expirationMonth: number,
    expirationYear: number,
    cvc: string
  },
  message: {
    body: {
      matchNumber: number,
      tickets: {
        category: number,
        quantity: number,
        price: number
      }
    }
  }
}

/**
 * Validate create new ticket reservation data transfer object (DTO)
 * @return null if validation passes otherwise a validation error
 */
const validateTicketReservationDto = (reservation: reservation) => {
  const schema = Joi.object()
    .keys({
      email: Joi.string().required(),
      card: Joi.object()
        .keys({
          number: Joi.string().required(),
          expirationMonth: Joi.number().required(),
          expirationYear: Joi.number().required(),
          cvc: Joi.string().required(),
        })
        .required()
        .unknown(false),
      message: Joi.object().keys({
        body: Joi.object()
          .keys({ matchNumber: Joi.number().strict().required(), tickets })
          .required(),
      }),
    })
    .required()
    .unknown(false);
  return schema.validate(reservation).error;
}

export default validateTicketReservationDto
