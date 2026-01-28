// src/services/ticket.service.js
import api from '../api';

export const createTickets = async (data) => {
  return await api('/tickets/reservation', 'POST', data);
};

export const getTickets = async () => {
  return await api('/tickets', 'GET');
};
