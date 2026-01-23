    <script>
        // Données d'exemple
        const user = {
            first_name: "Prénom",
            last_name: "Nom",
            mail: "email@test.com"
        };

        const tickets = [
            { date: "2026-02-01", name: "Billet journée", downloadable: true, deletable: true },
            { date: "2026-01-10", name: "Billet journée", downloadable: true, deletable: false }
        ];

    </script>

    <main class="main">
        <section class="main__compte">
            <h2 class="compte__title">Mon compte</h2>

            <p class="compte__text">
            Ici relier les informations du compte utilisateur lors de l'inscription (nom, prénom, email, mot de passe) avec possibilité de les modifier.
            </p>

            <!-- Exemple affichage profil -->
            <div class="compte__profil">
            <p class="compte__text"><strong>Prénom :</strong> {user.first_name}</p>
            <p class="compte__text"><strong>Nom :</strong> {user.last_name}</p>
            <p class="compte__text"><strong>Email :</strong> {user.mail}</p>
            </div>

            <p class="compte__text">
            Ici ajouter la liste des billets par date d'entrée avec possibilité de les télécharger et supprimer (si date d'entrée &gt; 10 jours).
            </p>

            <!-- Exemple liste billets -->
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
        </section>
    </main>