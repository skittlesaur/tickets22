const axios = require("axios");
import { RESERVATIONS_URL } from "../constants";

const processPendingTicket = async (message) => {
  try {
    const ticketPending = await axios.post(
      `${RESERVATIONS_URL}/tickets/proccesors/pending`,
      message.message
    );

    console.log("tickets are pending");
  } catch (error) {
    console.log(error.response);
  }
};

const processCancelledTicket = async (message) => {
  try {
    const ticketCancelled = await axios.post(
      `${RESERVATIONS_URL}/tickets/proccesors/cancelled`,
      message.message
    );

    console.log("tickets are cancelled");
  } catch (error) {
    console.log(error.response);
  }
};

const processReservedTicket = async (message) => {
  try {
    const ticketPending = await axios.post(
      `${RESERVATIONS_URL}/tickets/proccesors/reserved`,
      message.message
    );

    console.log("tickets are reserved");
  } catch (error) {
    console.log(error.response);
  }
};

const processMasterlist = async (message) => {
  // console.log("[processMasterlist]", message);

  return Promise.resolve("[processMasterlist]");
};

module.exports = {
  processPendingTicket,
  processReservedTicket,
  processCancelledTicket,
};
