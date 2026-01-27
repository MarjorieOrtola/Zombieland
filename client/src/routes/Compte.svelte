<script>
  import { onMount } from "svelte";
  import { deleteReservation } from "../lib/services/reservation.service.js";

  let user = null;
  let error = "";

  // Fonction pour se déconnecter sans recharger la page
  function logout() {
    localStorage.removeItem("token"); // supprime le token
    user = null;                       // réinitialise l'utilisateur
    error = "Vous êtes déconnecté";    // message optionnel
  }

  // Supprimer une réservation
  async function handleDelete(reservationId) {
    if (!confirm("Voulez-vous vraiment supprimer cette réservation ?")) return;

    try {
      await deleteReservation(reservationId);
      alert("Réservation supprimée !");
      // Mise à jour de la liste des réservations
      user.reservations = user.reservations.filter(r => r.id !== reservationId);
    } catch (err) {
      alert(err.message || "Erreur lors de la suppression");
    }
  }

  // Récupérer les informations de l'utilisateur
  async function fetchUser() {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        error = "Pas connecté";
        user = null;
        return;
      }

      const res = await fetch(`${import.meta.env.VITE_API_URL}/myaccount`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        const message = await res.text();
        console.error("Erreur API:", message);
        error = "Token invalide ou expiré";
        localStorage.removeItem("token"); // nettoyage automatique
        user = null;
        return;
      }

      user = await res.json();
      error = ""; // clear errors
    } catch (err) {
      console.error(err);
      error = "Erreur serveur";
      user = null;
    }
  }

  onMount(() => {
    fetchUser();
  });
</script>

<main class="main">
  <section class="main__compte">
    <h2 class="compte__title">Mon compte</h2>

    {#if error && !user}
      <p>{error}</p>
    {/if}

    {#if user}
      <div class="compte__profil">
        <p><strong>Prénom :</strong> {user.first_name}</p>
        <p><strong>Nom :</strong> {user.last_name}</p>
        <p><strong>Email :</strong> {user.mail}</p>
        <p><strong>Adresse :</strong> {user.address}</p>
        <p><strong>Ville :</strong> {user.city}</p>
        <p><strong>Code postal :</strong> {user.postcode}</p>
      </div>

      <button on:click={logout} class="btn-logout">
        Déconnexion
      </button>

      <h3>Réservations</h3>
      {#if user.reservations.length > 0}
        <ul>
          {#each user.reservations as r}
            <li class="compte__reservation">
              {r.ticket.name} — {r.date_entrance} — 
              <span class="compte__bold">{r.quantity} billet{r.quantity > 1 ? 's' : ''}</span> — 
              Réf: {r.reference}

              <!-- Bouton Supprimer -->
              <button class="btn-supprimer" on:click={() => handleDelete(r.id)}>
                Supprimer
              </button>
            </li>
          {/each}
        </ul>
      {:else}
        <p>Aucune réservation</p>
      {/if}
    {/if}

    {#if !user && !error}
      <p>Chargement...</p>
    {/if}
  </section>
</main>

<style>
.btn-logout {
  margin-top: 20px;
  padding: 10px 20px;
  background-color: #e63946;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.btn-logout:hover {
  background-color: #d62828;
}

/* Style du bouton Supprimer */
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

.btn-supprimer:hover {
  background-color: #d66a00;
}
</style>
