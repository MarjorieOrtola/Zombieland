<script>
import Header from "../components/Header.svelte";
import Footer from "../components/Footer.svelte";
const activities = [
    {
      title: 'DEAD RISE',
      img: '/img/deadrise.jpg'
    },
    {
      title: 'LABYRINTHE DES ZOMBIES',
      img: '/img/Labyrinthe.png'
    }
  ];
 </script>

<main class="main">
  {#each activities as activity}
    <section class="main__activity">
      <h2 class="activity__title">{activity.title}</h2>
      <img
        class="activity__img"
        src={activity.img}
        alt="Image du parc"
      />  
      <button class="main__button-info">
        Plus d'informations
      </button>
    </section>
  {/each}
</main>


