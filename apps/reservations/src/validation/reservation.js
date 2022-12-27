const Joi = require("@hapi/joi");
const { tickets } = require("./shared-schema");

const reservationValidation = {
  /**
   * Validate create new ticket reservation data transfer object (DTO)
   * @return null if validation passes otherwise a validation error
   */
  validateTicketReservationDto(reservation) {
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
  },
};

module.exports = reservationValidation;
