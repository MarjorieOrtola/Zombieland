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
