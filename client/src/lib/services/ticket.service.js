// ticket.service.js
export async function createTickets(data) {
  const token = data.token;
  const res = await fetch(`${import.meta.env.VITE_API_URL}/tickets/reservation`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      ticket_id: data.ticket_id,
      quantity: data.quantity,
      date_entrance: data.date_entrance,
    }),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(text);
  }

  return await res.json();
}
