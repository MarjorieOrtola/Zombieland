<script>
  let amount = 1;

  function increment() {
    amount += 1;
  }

  function decrement() {
    if (amount > 1) {
      amount -= 1;
    }
  }

  function validate() {
    console.log("Nombre de tickets :", amount);
   
  }
</script>

<main class="main">
  <section class="main__activity">
    <h2 class="activity__title">Choisissez le nombre d'aventures</h2>
    <p>Billet sur une journée complète. Description du billet ici</p>
    <p>Rajouter un calendrier ici pour choisir la date</p>

    <form class="ticket" on:submit|preventDefault={validate}>
      <label class="ticket__form-label" for="amount">
        Nombre de tickets
      </label>

      <div class="ticket__controls">
        <button 
          type="button" 
          class="ticket__amount" 
          on:click={decrement}
        >
          -
        </button>

        <input
          type="number"
          id="amount"
          name="amount"
          bind:value={amount}
          min="1"
          required
        />

        <button 
          type="button" 
          class="ticket__amount" 
          on:click={increment}
        >
          +
        </button>
      </div>

      <button class="register__form-button" type="submit">
        Valider
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
</style>