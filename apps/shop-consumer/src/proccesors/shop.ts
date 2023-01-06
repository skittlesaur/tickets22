const axios = require("axios");
import { RESERVATIONS_URL } from "../constants";

export const processPendingTicket = async (message: any) => {
  try {
    const ticketPending = await axios.post(
      `${RESERVATIONS_URL}/tickets/processors/pending`,
      message
    );

    console.log("tickets have been sent to pending processor")
  } catch (error: any) {
    console.log(error)
  }
};

export const processCancelledTicket = async (message: any) => {
  try {
    const ticketCancelled = await axios.post(
      `${RESERVATIONS_URL}/tickets/processors/cancelled`,
      message
    );

    console.log("tickets have been sent to cancellation processor");
  } catch (error: any) {
    console.log(error.response);
  }
};

export const processReservedTicket = async (message: any) => {
  try {
    const ticketPending = await axios.post(
      `${RESERVATIONS_URL}/tickets/processors/reserved`,
      message
    );

    console.log("tickets have been sent to reservation processor");
  } catch (error: any) {
    console.log(error.response);
  }
};

export const processMasterlist = async (message: any) => {
  try {
    const ticketPending = await axios.post(
      `${RESERVATIONS_URL}/tickets/processors/update`,
      message
    );

    console.log("tickets have been sent to masterlist processor");
  } catch (error: any) {
    console.log(error.response);
  }
};
