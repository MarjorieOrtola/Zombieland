// src/services/reservation.service.js
import api from '../api';

export const deleteReservation = async (id) => {
  return await api(`/reservations/${id}`, 'DELETE');
};

export const createReservation = async (data) => {
  return await api('/reservations', 'POST', data);
};

export const getReservations = async () => {
  return await api('/reservations', 'GET');
};
