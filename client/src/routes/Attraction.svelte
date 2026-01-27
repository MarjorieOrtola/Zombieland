<script>

 import { push } from "svelte-spa-router";

const activities = [
  {
    id: 1,
    title: 'DEAD RISE',
    img: '/img/deadrise.jpg'
  },
  {
    id: 2,
    title: 'LABYRINTHE DES ZOMBIES',
    img: '/img/Labyrinthe.png'
  }
];

  function goToDetail(id) {
    push(`/detail/${id}`);
  }

 </script>

<main class="main">
  {#each activities as activity}
    <section class="main__activity">
      <h2 class="activity__title">{activity.title}</h2>

      <img class="activity__img" src={activity.img} alt="Image du parc" />

<button on:click={() => goToDetail(activity.id)}>
  Plus d'informations
</button>
    </section>
  {/each}
</main>


