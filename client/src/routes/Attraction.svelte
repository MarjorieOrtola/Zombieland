<script>
  import { onMount } from "svelte";
  import { push } from "svelte-spa-router";
  import { getActivitiesByCategory } from "../lib/services/activity.service.js";


  let activities = [];
  let error = "";
 

   onMount(async () => {
    try {
       activities = await getActivitiesByCategory("attraction");; // Fetch la liste des attractions
    } catch (e) {
      error = "Impossible de charger les attractions";
    } 
    
  });

</script>

<main class="main">
  {#if error}
    <p>{error}</p>

  {:else if activities.length === 0}
    <p>Chargement...</p>

  {:else}
    {#each activities as activity}
      <section class="main__activity">
        <h2>{activity.name}</h2>

        <img
          class="activity__img"
          src={`/img/${activity.image}.jpg`}
          alt={activity.name}
        />

        <button class="activity__button-detail" on:click={() => push(`/detail/attraction/${activity.id}`)}>
          Plus d'informations
        </button>

      </section>
    {/each}
  {/if}
</main>