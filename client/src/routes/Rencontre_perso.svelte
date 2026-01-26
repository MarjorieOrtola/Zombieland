    <script>

    const activities = [
    {
      title: "Le maître des zombies",
      img: './img/Frankenstein.png'
    },
    {
      title: "LA SURVIVANTE",
      img: './img/La dame au catana.png'
    }
  ];
</script>

<main class="main">
  {#each activities as activity}
    <section class="main__activity">
      <h2 class="activity__title">{activity.title}</h2>

      <img class="activity__img" src={activity.img} alt="Image du parc" />

      <button class="main__button-info" type="button">
        Plus d'informations
      </button>
    </section>
  {/each}
</main>
