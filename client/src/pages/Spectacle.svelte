<script>
    const activities = [
    {
      title: 'MASSACRE A LA TRONCONNEUSE',
      img: '/img/massacreàlatronconneuse.jpg'
    },
    {
      title: 'LACHER DE ZOMBIES',
      img: '/img/Lacherdezombies.jpg'
    }
  ];
</script>

    <main class="main">
  {#each activities as activity}
    <section class="main__activity">
      <h2 class="activity__title">{activity.title}</h2>

      <img class="activity__img" src={activity.img} alt="Image spectacle" />

      <button class="main__button-info" type="button">
        Plus d'informations
      </button>
    </section>
  {/each}
</main>