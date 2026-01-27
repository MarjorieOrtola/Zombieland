<script>
  import { onMount } from "svelte";

  let user = null;
  let error = "";

  onMount(async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        error = "Pas connecté";
        return;
      }

      const res = await fetch(`${import.meta.env.VITE_API_URL}/myaccount`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        const message = await res.text(); // éviter le crash JSON
        console.error("Erreur API:", message);
        error = "Token invalide ou expiré";
        localStorage.removeItem("token");
        return;
      }

      user = await res.json(); // ici seulement
    } catch (err) {
      console.error(err);
      error = "Erreur serveur";
    }
  });
  console.log("Données utilisateur:", user);
  console.log(import.meta.env.VITE_API_URL);
</script>

<main class="main">
  <section class="main__compte">
    <h2 class="compte__title">Mon compte</h2>

    <!-- Exemple affichage profil -->
    {#if error}
      <p>{error}</p>
    {:else if user}
      <div class="compte__profil">
        <p><strong>Prénom :</strong> {user.first_name}</p>
        <p><strong>Nom :</strong> {user.last_name}</p>
        <p><strong>Email :</strong> {user.mail}</p>
        <p><strong>Adresse :</strong> {user.address}</p>
        <p><strong>Ville :</strong> {user.city}</p>
        <p><strong>Code postal :</strong> {user.postcode}</p>
      </div>
    {:else}
      <p>Chargement...</p>
    {/if}

    {#if user}
      <h3>Réservations</h3>
      {#if user.reservations.length > 0}
        <ul>
          {#each user.reservations as r}
            <li>
              {r.ticket.name} — {r.date_entrance} — {r.quantity} billets — Réf: {r.reference}
            </li>
          {/each}
        </ul>
      {:else}
        <p>Aucune réservation</p>
      {/if}
    {/if}

  </section>
</main>
