<script>
  import { createTickets } from "../lib/services/ticket.service.js";

  let loading = false;
  let amount = 1;
  let selectedDate = "";
  let error = "";
  let success = "";
  const ticketId = 1;

  function increment() {
    amount += 1;
  }

  function decrement() {
    if (amount > 1) amount -= 1;
  }

  async function validate() {
    error = "";
    success = "";

    const token = localStorage.getItem("token");

    // Vérification connexion
    if (!token) {
      error = "Veuillez vous connecter ou vous inscrire pour acheter des billets.";
      return;
    }

    // Vérification date
    if (!selectedDate) {
      error = "Veuillez choisir une date.";
      return;
    }

    loading = true;

    try {
      await createTickets({
        ticket_id: ticketId,
        date_entrance: selectedDate,
        quantity: amount,
        token, // On passe le token à la requête
      });

      success = "Billets réservés avec succès ! Redirection en cours…";

      // Redirection après un petit délai
      setTimeout(() => {
        window.location.href = "/#/compte";
      }, 1500);

    } catch (err) {
      if (err.message.includes("Unauthorized")) {
        error = "Veuillez vous connecter pour réserver des billets.";
      } else {
        error = err.message || "Erreur lors de la réservation";
      }
    } finally {
      loading = false;
    }
  }
</script>


<main class="main">
  <section class="main__activity">
    <h2 class="activity__title">Choisissez le nombre d'aventures</h2>

    {#if error}
      <p class="error">{error}</p>
    {/if}

    {#if success}
      <p class="success">{success}</p>
    {/if}

    <label class="ticket__date-label">
      Choisissez votre date de visite :
      <input
        class="ticket__date-input"
        type="date"
        bind:value={selectedDate}
        min={new Date().toISOString().split("T")[0]}
      />
    </label>

    <form class="ticket" on:submit|preventDefault={validate}>
      <label class="ticket__form-label" for="amount">Nombre de tickets</label>

      <div class="ticket__controls">
        <button type="button" class="ticket__amount" on:click={decrement}>-</button>

        <input
          type="number"
          id="amount"
          name="amount"
          bind:value={amount}
          min="1"
          required
        />

        <button type="button" class="ticket__amount" on:click={increment}>+</button>
      </div>

      <button class="register__form-button" type="submit" disabled={loading}>
        {loading ? "Réservation..." : "Valider"}
      </button>
    </form>
  </section>
</main>

<style>
  .ticket__controls {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 0.5rem;
    margin: 1rem 0;
  }

  .ticket__amount {
    width: 2.5rem;
    height: 2.5rem;
    font-size: 1.5rem;
    background-color: var(--color-button);
    color: var(--color-text);
    border: solid darkred 2px;
    border-radius: 4px;
    cursor: pointer;
  }

  .ticket__amount:disabled {
    background-color: gray;
    cursor: not-allowed;
  }

  .ticket input[type="number"] {
    width: 60px;
    text-align: center;
    font-size: 1.2rem;
    padding: 0.3rem;
    border-radius: 4px;
    border: solid darkred 2px;
    background-color: var(--background-form);
    color: var(--color-input);
  }

  .error {
    color: red;
    font-weight: bold;
  }

  .success {
    color: green;
    font-weight: bold;
  }

  .ticket__date-label {
  display: flex;
  flex-direction: column;
  align-items: center; 
  gap: 0.5rem;
  margin: 1rem 0;
  text-align: center;
}

.ticket__date-input {
  text-align: center;
  width: 160px;        
}


</style>
