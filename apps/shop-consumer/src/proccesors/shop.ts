const axios = require("axios");
import { RESERVATIONS_URL } from "../constants";

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

export const processPendingTicket = async (message: message) => {
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

export const processCancelledTicket = async (message: message) => {
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

export const processReservedTicket = async (message: message) => {
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
