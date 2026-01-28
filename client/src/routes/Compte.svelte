<script>
  import { onMount } from "svelte";
  import authStore, { setAuth, clearAuth } from "../lib/store/authStore.js";
  import { getUser } from "../lib/services/auth.service.js";
  import { deleteReservation } from "../lib/services/reservation.service.js";
  import { get } from "svelte/store";

  let user = null;
  let error = "";

  // Récupération des infos utilisateur depuis l'API / store
  async function fetchUser() {
    try {
      const token = get(authStore).token;
      if (!token) {
        error = "Pas connecté";
        user = null;
        return;
      }

      const data = await getUser();
      user = data;
      error = "";

      setAuth(user, token); // synchroniser le store

    } catch (err) {
      console.error(err);
      error = "Erreur serveur ou token invalide";
      user = null;
      clearAuth();
    }
  }

  onMount(() => fetchUser());

  // Déconnexion
  function logout() {
    clearAuth();
    user = null;
    error = "Vous êtes déconnecté";
  }

  // Supprimer une réservation
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

  // Vérifie si la réservation peut être supprimée
 function canDeleteReservation(date_entrance) {
  const today = new Date();
  const visitDate = new Date(date_entrance); // string → Date
  const diffTime = visitDate.getTime() - today.getTime(); // en ms
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays > 10;
}
</script>

<main class="main">
  <section class="main__compte">
    {#if user}
      <div class="compte__header">
        <h2>Mon compte</h2>
        <button class="btn-deconnexion" on:click={logout}>Déconnexion</button>
      </div>

      <div class="compte__profil">
        <p><strong>Prénom :</strong> {user.first_name}</p>
        <p><strong>Nom :</strong> {user.last_name}</p>
        <p><strong>Email :</strong> {user.mail}</p>
        <p><strong>Adresse :</strong> {user.address}</p>
        <p><strong>Ville :</strong> {user.city}</p>
        <p><strong>Code postal :</strong> {user.postcode}</p>
      </div>

      <h3>Réservations</h3>
      {#if user.reservations?.length > 0}
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

    {:else if error}
      <p>{error}</p>
    {:else}
      <p>Chargement...</p>
    {/if}
  </section>
</main>

<style>
  .compte__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1.5rem;
  }

  .btn-deconnexion {
    padding: 8px 16px;
    background-color: #d63031;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 0.9rem;
  }

  .btn-deconnexion:hover {
    background-color: #c0392b;
  }

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