import api from "../api";

export const createTickets = async ({ticket_id, date_entrance, quantity }) => {
  return await api("/tickets/reservation", "POST", {
    ticket_id,
    date_entrance,
    quantity,
  });
};