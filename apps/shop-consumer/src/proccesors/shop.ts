const axios = require("axios");
import { RESERVATIONS_URL } from "../constants";

interface message {
  meta: {
    action: string
  },
  body: {
    matchNumber: Int16Array,
    tickets: {
      category: Int16Array,
      quantity: Int16Array,
      price: Int16Array
    }
  }
}

const processPendingTicket = async (message: message) => {
  try {
    const ticketPending = await axios.post(
      `${RESERVATIONS_URL}/tickets/processors/pending`,
      message
    );

    console.log("tickets are pending")
  } catch (error: any) {
    console.log(error.response)
  }
};

const processCancelledTicket = async (message: message) => {
  try {
    const ticketCancelled = await axios.post(
      `${RESERVATIONS_URL}/tickets/processors/cancelled`,
      message
    );

    console.log("tickets are cancelled");
  } catch (error: any) {
    console.log(error.response);
  }
};

const processReservedTicket = async (message: message) => {
  try {
    const ticketPending = await axios.post(
      `${RESERVATIONS_URL}/tickets/processors/reserved`,
      message
    );

    console.log("tickets are reserved");
  } catch (error: any) {
    console.log(error.response);
  }
};

const processMasterlist = async (message: object) => {
  // console.log("[processMasterlist]", message);

  return Promise.resolve("[processMasterlist]");
};

module.exports = {
  processPendingTicket,
  processReservedTicket,
  processCancelledTicket,
};
