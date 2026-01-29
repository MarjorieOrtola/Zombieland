<script>
  import { onMount } from "svelte";
  import { getAllReservations, deleteReservation } from "../lib/services/admin.service.js";

  let reservations = [];
  let loading = true;
  let error = "";

  async function fetchReservations() {
    try {
      reservations = await getAllReservations();
    } catch (e) {
      error = "Impossible de charger les réservations";
      console.error(e);
    } finally {
      loading = false;
    }
  }

  async function removeReservation(id) {
    if (!confirm("Voulez-vous vraiment supprimer cette réservation ?")) return;
    try {
      await deleteReservation(id);
      reservations = reservations.filter(r => r.id !== id);
    } catch (e) {
      alert("Erreur lors de la suppression");
      console.error(e);
    }
  }

  onMount(fetchReservations);
</script>

<section class="admin-reservations">
  <h2>Gestion des réservations</h2>

  {#if loading}
    <p>Chargement...</p>
  {:else if error}
    <p class="error">{error}</p>
  {:else if reservations.length === 0}
    <p>Aucune réservation trouvée</p>
  {:else}
    <ul class="reservation-list">
      {#each reservations as r}
        <li class="reservation-card">
          <div class="reservation-info">
            <h3>Réf : {r.reference}</h3>
            <p>
              <strong>Utilisateur :</strong> {r.user.first_name} {r.user.last_name}<br />
              <strong>Ticket :</strong> {r.ticket.name}<br />
              <strong>Quantité :</strong> {r.quantity}<br />
              <strong>Date d'entrée :</strong> {new Date(r.date_entrance).toLocaleDateString()}
            </p>
          </div>

          <div class="actions">
            <button class="delete" on:click={() => removeReservation(r.id)}>Supprimer</button>
          </div>
        </li>
      {/each}
    </ul>
  {/if}
</section>

<style>


.admin-reservations {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  font-family: 'Arial', sans-serif;
}

.reservation-list {
  list-style: none;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.reservation-card {
  background: rgba(0,0,0,0.4);
  padding: 0.75rem;
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

 h3, h2 {
  font-family: 'Montserrat', sans-serif;
  font-weight: 600;
  color:rgba(255, 255, 255, 0.795);

}

.actions {
  display: flex;
  gap: 0.5rem;
}

.delete {
  background-color: #b00020;
  color: white;
  border: none;
  padding: 0.3rem 0.6rem;
  cursor: pointer;
}

.delete:hover {
  background-color: #d32f2f;
}

.error {
  color: #ff6b6b;
}

@media (min-width: 768px) {
  .reservation-card {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
}
</style>
