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

            <p class="compte__text">
            Ici relier les informations du compte utilisateur lors de l'inscription (nom, prénom, email, mot de passe) avec possibilité de les modifier.
            </p>

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

            <p class="compte__text">
            Ici ajouter la liste des billets par date d'entrée avec possibilité de les télécharger et supprimer (si date d'entrée &gt; 10 jours).
            </p>

            <!-- Exemple liste billets -->
<!---
            <ul class="compte__tickets">
            {#each tickets as ticket}
                <li class="compte__ticket">
                <span>{ticket.date} — {ticket.name}</span>

                <button type="button" on:click={() => downloadTicket(ticket)} disabled={!ticket.downloadable}>
                    Télécharger
                </button>
                
                <button type="button" on:click={() => deleteTicket(ticket)} disabled={!ticket.deletable}>
                    Supprimer
                </button>
                </li>
            {/each}
            </ul>
        -->
        </section>
    </main>