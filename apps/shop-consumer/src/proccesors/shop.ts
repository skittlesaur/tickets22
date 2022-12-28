const axios = require("axios");
import { RESERVATIONS_URL } from "../constants";
import { Response } from 'express';

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

export const processMasterlist = async (masterlistMessage: object) => {
  try {
    const updateMasterList = await axios.post(`${RESERVATIONS_URL}/tickets/processors/masterlist`, masterlistMessage)

    console.log('masterlist Updated')
  } catch (error: any) {
    console.log(error.response)
  }
};
