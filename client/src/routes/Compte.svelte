<script>
  import { onMount } from "svelte";
  import authStore, { setAuth, clearAuth } from "../lib/store/authStore.js";
  import { getUser } from "../lib/services/auth.service.js";
  import { deleteReservation } from "../lib/services/reservation.service.js";
  import { get } from "svelte/store";

  let user = null;
  let error = "";

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
      setAuth(user, token);
      error = "";
    } catch (err) {
      console.error(err);
      error = "Erreur serveur ou token invalide";
      user = null;
      clearAuth();
    }
  }

  onMount(fetchUser);

  function logout() {
    clearAuth();
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
</script>

<section class="compte">
  {#if user}
    <!-- Carte centrée profil utilisateur -->
    <div class="profile-card-container">
      <div class="profile-card">
        <div class="compte__header">
          <h2>Mon compte</h2>
        </div>

        <div class="profile-info">
          <h3>{user.first_name} {user.last_name}</h3>
          <div><strong>Email :</strong> {user.mail}</div>
          <div><strong>Téléphone :</strong> {user.phone_number || "N/A"}</div>
          <div><strong>Adresse :</strong> {user.address}</div>
          <div><strong>Ville :</strong> {user.city}</div>
          <div><strong>Code postal :</strong> {user.postcode}</div>
        </div>
      </div>
    </div>

    <!-- Réservations -->
    <h2>Mes réservations</h2>
    {#if user.reservations?.length > 0}
      <ul class="reservation-list">
        {#each user.reservations as r}
          <li class="reservation-card">
            <div class="reservation-info">
              <h3>{r.ticket.name}</h3>
              <div><strong>Date :</strong> {r.date_entrance}</div>
              <div><strong>Billets :</strong> {r.quantity}</div>
              <div><strong>Référence :</strong> {r.reference}</div>
            </div>
            <div class="actions">
              <button
                class="delete"
                on:click={() => handleDelete(r.id)}
                disabled={!canDeleteReservation(r.date_entrance)}
                title={!canDeleteReservation(r.date_entrance) ? "Impossible de supprimer moins de 10 jours avant la visite" : ""}
              >
                Supprimer
              </button>
            </div>
          </li>
        {/each}
      </ul>
    {:else}
      <p>Aucune réservation</p>
    {/if}

  {:else if error}
    <p class="error">{error}</p>
  {:else}
    <p>Chargement...</p>
  {/if}
</section>

<style>


h2, h3 {
  font-family: 'Montserrat', sans-serif;
  font-weight: 600;
  color: white;
}


.compte {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: center;
}

/* Conteneur pour centrer la carte */
.profile-card-container {
  width: 100%;
  display: flex;
  justify-content: center;
}


.profile-card {
  background: #5e5c5c8e; 
  padding: 1rem 1.5rem;
  border-radius: 6px;
  display: flex;
  flex-direction: column; 
  align-items: center;    
  gap: 1rem;
  max-width: 600px;
  width: 100%;
  box-shadow: 0 2px 6px rgba(0,0,0,0.1);
}

/* Header centré avec titre et bouton */
.compte__header {
  display: flex;
  flex-direction: column; 
  align-items: center;    
  gap: 0.5rem;            
}


/* Infos utilisateur centrées */
.profile-info {
  display: flex;
  flex-direction: column;
  align-items: center; /* centrer horizontalement */
  gap: 0.2rem;
}

.profile-info div {
  margin: 0.2rem 0;
}

.reservation-list {
  list-style: none;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  width: 100%;
  max-width: 600px;
}

.reservation-card {
  background: #5e5c5c8e;
  padding: 0.75rem 1rem;
  border-radius: 6px;
  display: flex;
  flex-direction: column; /* cartes mobiles empilées */
  justify-content: space-between;
  align-items: center;
  gap: 0.5rem;
  box-shadow: 0 1px 4px rgba(0,0,0,0.1);
}

.reservation-info h3 {
  margin: 0 0 0.25rem 0;
}

.actions {
  display: flex;
  gap: 0.5rem;
  margin-top: 0.5rem;
}

.delete {
  background-color: #b00020;
  color: white;
  border: none;
  padding: 0.3rem 0.6rem;
  cursor: pointer;
  border-radius: 4px;
}

.delete:hover:enabled {
  background-color: #d32f2f;
}

.delete:disabled {
  background-color: gray;
  cursor: not-allowed;
}

/* ========================
   ERREURS ET MESSAGES
======================== */
.error {
  color: #ff6b6b;
}

/* ========================
   MEDIA QUERIES
======================== */
@media (min-width: 768px) {
  .reservation-card {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }

  .reservation-card .actions {
    margin-top: 0;
  }
}

</style>
