const axios = require("axios");
import { RESERVATIONS_URL } from "../constants";

interface ticketSaleMessage {
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

export const processPendingTicket = async (message: ticketSaleMessage) => {
  try {
    const ticketPending = await axios.post(
      `${RESERVATIONS_URL}/tickets/processors/pending`,
      message
    );

    console.log("tickets have been sent to pending processor")
  } catch (error: any) {
    console.log(error.response)
  }
};

export const processCancelledTicket = async (message: ticketSaleMessage) => {
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

export const processReservedTicket = async (message: ticketSaleMessage) => {
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

export const processMasterlist = async (message: object) => {
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
