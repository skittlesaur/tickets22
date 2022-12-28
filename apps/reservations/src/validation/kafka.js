const Joi = require("@hapi/joi");
import {
  TICKET_RESERVED,
  TICKET_PENDING,
  TICKET_CANCELLED,
} from "../constants";
const { tickets } = require("./shared-schema");

const kafkaMessageValidation = {
  /**
   * Validate schema for pending/reserved/cancelled ticket
   * @return null if validation passes otherwise a validation error
   */
  kafkaMessage(reservation) {
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
            tickets,
          })
          .unknown(false),
      })
      .required();
    return schema.validate(reservation).error;
  },
};

module.exports = kafkaMessageValidation;