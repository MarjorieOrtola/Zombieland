<script>
  import { onMount } from "svelte";
  import { push } from "svelte-spa-router";
  import { getPersonnages } from "../lib/services/Rencontre_perso.service.js";

  let activities = [];
  let error = "";
 

   onMount(async () => {
    try {
      activities = await getPersonnages(); // Fetch la liste des personnages
    } catch (e) {
      error = "Impossible de charger les personnages.";
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

        <button on:click={() => push(`/detail/${activity.id}`)}>
          Plus d'informations
        </button>
      </section>
    {/each}
  {/if}
</main>