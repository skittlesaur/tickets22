const axios = require('axios')
import { RESERVATIONS_URL } from '../constants'

export const processPendingTicket = async (message: any) => {
  try {
    const ticketPending = await axios.post(
      `${RESERVATIONS_URL}/tickets/processors/pending`,
      message,
    )

    console.log('processed pending ticket', message)
  } catch (error: any) {
    console.log('failed processing pending:', error?.response?.data)
  }
}

export const processCancelledTicket = async (message: any) => {
  try {
    const ticketCancelled = await axios.post(
      `${RESERVATIONS_URL}/tickets/processors/cancelled`,
      message,
    )

    console.log('processed cancelled ticket', message)
  } catch (error: any) {
    console.log('failed processing cancelled:', error?.response?.data)
  }
}

export const processReservedTicket = async (message: any) => {
  try {
    const ticketPending = await axios.post(
      `${RESERVATIONS_URL}/tickets/processors/reserved`,
      message,
    )

    console.log('processed reserved ticket', message)
  } catch (error: any) {
    console.log('failed processing reserved:', error?.response?.data)
  }
}

export const processMasterlist = async (message: any) => {
  try {
    const masterList = await axios.post(
      `${RESERVATIONS_URL}/tickets/processors/update`,
      message,
    )

    console.log('proceed masterlist', message.data)
  } catch (error: any) {
    console.log('failed processing masterlist:', error?.response?.data)
  }
}
