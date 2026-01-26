import api from "../api";

export const createTickets = async ({ date, quantity }) => {
  return await api("/tickets", "POST", {
    date,
    quantity,
  });
};