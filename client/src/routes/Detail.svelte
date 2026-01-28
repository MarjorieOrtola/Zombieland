<script>
  import { onMount } from "svelte";
  import api from "../lib/api";
  import { getActivityByCategoryAndId } from "../lib/services/activity.service.js";


  export let params = {}; // injecté par svelte-spa-router

  let activity = null;
  let error = "";
  let loading = true;

 onMount(async () => {
  try {
    activity = await getActivityByCategoryAndId(params.type, params.id);
  } catch (e) {
    error = "Élément introuvable";
  } finally {
    loading = false;
  }
});
</script>

<main class="main">
  {#if loading}
    <p>Chargement de l'activité...</p>
  {:else if error}
    <p>{error}</p>
  {:else}
    <h2>{activity.name}</h2>
    <p>{activity.description}</p>
    <img src={`/img/${activity.image}.jpg`} alt={activity.name} />
  {/if}
</main>