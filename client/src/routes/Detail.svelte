<script>
  import { onMount } from "svelte";
  import api from "../lib/api";

  export let params = {}; // injecté par svelte-spa-router

  let activity = null;
  let error = "";
  let loading = true;

  onMount(async () => {
    try {
      activity = await api(`/detail/${params.id}`); // récupère l'activité via son ID
    } catch (e) {
      console.error(e);
      error = "Activité introuvable";
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
    <img src={activity.imageUrl} alt={activity.name} />
  {/if}
</main>