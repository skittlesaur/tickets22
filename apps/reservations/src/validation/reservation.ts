import Joi from 'joi'

/**
 * Validate create new ticket reservation data transfer object (DTO)
 * @return null if validation passes otherwise a validation error
 */
const validateTicketReservationDto = (reservation: any) => {
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
          .keys({
            matchNumber: Joi.number().strict().required(),
            tickets: Joi.object().keys({
              category: Joi.number().strict().valid(1, 2, 3).required(),
              quantity: Joi.number().strict().min(1).max(2).required(),
              price: Joi.number().strict().valid(75, 125, 195).required(),
            }).required()
          })
          .required(),
      }),
    })
    .required()
    .unknown(false);
  return schema.validate(reservation).error;
}

export default validateTicketReservationDto
