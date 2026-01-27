<script>
  import { onMount } from "svelte";
  import { deleteReservation } from "../lib/services/reservation.service.js";

  let user = null;
  let error = "";

  function logout() {
    localStorage.removeItem("token");
    user = null;
    error = "Vous êtes déconnecté";
  }

  async function handleDelete(reservationId) {
    if (!confirm("Voulez-vous vraiment supprimer cette réservation ?")) return;

    try {
      await deleteReservation(reservationId);
      alert("Réservation supprimée !");
      user.reservations = user.reservations.filter(r => r.id !== reservationId);
    } catch (err) {
      alert(err.message || "Erreur lors de la suppression");
    }
  }

  function canDeleteReservation(date_entrance) {
    const today = new Date();
    const visitDate = new Date(date_entrance);
    const diffDays = Math.ceil((visitDate - today) / (1000 * 60 * 60 * 24));
    return diffDays > 10;
  }

  async function fetchUser() {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        error = "Pas connecté";
        user = null;
        return;
      }

      const res = await fetch(`${import.meta.env.VITE_API_URL}/myaccount`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) {
        const message = await res.text();
        console.error("Erreur API:", message);
        error = "Token invalide ou expiré";
        localStorage.removeItem("token");
        user = null;
        return;
      }

      user = await res.json();
      error = "";
    } catch (err) {
      console.error(err);
      error = "Erreur serveur";
      user = null;
    }
  }

  onMount(() => fetchUser());
</script>

<main class="main">
  <section class="main__compte">
    {#if user}
      <h3>Réservations</h3>
      {#if user.reservations.length > 0}
        <ul>
          {#each user.reservations as r}
            <li class="compte__reservation">
              {r.ticket.name} — {r.date_entrance} — 
              <span class="compte__bold">{r.quantity} billet{r.quantity > 1 ? 's' : ''}</span> — 
              Réf: {r.reference}

              <button 
                class="btn-supprimer" 
                on:click={() => handleDelete(r.id)} 
                disabled={!canDeleteReservation(r.date_entrance)}
                title={!canDeleteReservation(r.date_entrance) ? "Impossible de supprimer moins de 10 jours avant la visite" : ""}
              >
                Supprimer
              </button>
            </li>
          {/each}
        </ul>
      {:else}
        <p>Aucune réservation</p>
      {/if}
    {/if}

    {#if error && !user}
      <p>{error}</p>
    {/if}

    {#if !user && !error}
      <p>Chargement...</p>
    {/if}
  </section>
</main>

<style>
.btn-supprimer {
  margin-left: 1rem;
  padding: 5px 10px;
  background-color: #f77f00;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.85rem;
}

.btn-supprimer:disabled {
  background-color: gray;
  cursor: not-allowed;
}

.btn-supprimer:hover:enabled {
  background-color: #d66a00;
}
</style>
