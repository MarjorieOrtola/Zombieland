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

<h2>Réservations</h2>

{#if loading}
  <p>Chargement...</p>
{:else if error}
  <p>{error}</p>
{:else if reservations.length === 0}
  <p>Aucune réservation trouvée</p>
{:else}
  <table>
    <thead>
      <tr>
        <th>ID</th>
        <th>Utilisateur</th>
        <th>Ticket</th>
        <th>Quantité</th>
        <th>Date d'entrée</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      {#each reservations as r}
        <tr>
          <td>{r.id}</td>
          <td>{r.user.first_name} {r.user.last_name}</td>
          <td>{r.ticket.name}</td>
          <td>{r.quantity}</td>
          <td>{new Date(r.date_entrance).toLocaleDateString()}</td>
          <td>
            <button on:click={() => removeReservation(r.id)}>Supprimer</button>
          </td>
        </tr>
      {/each}
    </tbody>
  </table>
{/if}
