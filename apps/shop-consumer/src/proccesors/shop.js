const axios = require("axios");
const { PrismaClient } = require("@prisma/client");

const processPendingTicket = async (message) => {
  const prisma = new PrismaClient();

  const pendingTickets = prisma.availableTickets.findFirst({
    where: {
      matchNumber: message.body.matchNumber,
      category: { equals: message.body.tickets.category },
    },
    select: {
      id: true,
      pending: true,
    },
  });

  const newPending = pendingTickets.pending + message.body.tickets.quantity;

  const tickets = prisma.availabletickets.update({
    where: {
      id: pendingTickets.id,
    },
    data: {
      pending: newPending,
    },
  });

  return Promise.resolve("[processPendingTicket]");
};

const processCancelledTicket = async (message) => {
  const prisma = new PrismaClient();

  const pendingTickets = prisma.availableTickets.findFirst({
    where: {
      matchNumber: message.body.matchNumber,
      category: { equals: message.body.tickets.category },
    },
    select: {
      id: true,
      pending: true,
    },
  });

  const newPending = pendingTickets.pending - message.body.tickets.quantity;

  const tickets = prisma.availabletickets.update({
    where: {
      id: pendingTickets.id,
    },
    data: {
      pending: newPending,
    },
  });

  return Promise.resolve("[processCancelledTicket]");
};

const processReservedTicket = async (message) => {
  const prisma = new PrismaClient();

  const reservedTickets = prisma.availableTickets.findFirst({
    where: {
      matchNumber: message.body.matchNumber,
      category: { equals: message.body.tickets.category },
    },
    select: {
      id: true,
      available: true,
      pending: true,
    },
  });

  const newAvailable =
    reservedTickets.available - message.body.tickets.quantity;
  const newPending = reservedTickets.pending - message.body.tickets.quantity;

  const tickets = prisma.availabletickets.update({
    where: {
      id: reservedTickets.id,
    },
    data: {
      available: newAvailable,
      pending: newPending,
    },
  });

  return Promise.resolve("[processReservedTicket]");
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
