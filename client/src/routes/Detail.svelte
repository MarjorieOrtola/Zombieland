<script>
  import { onMount } from "svelte";
  import { params } from "svelte-spa-router";
  import api from "../lib/api";

  let activity = null;
  let error = "";

  $: id = $params.id;

  onMount(async () => {
    try {
      activity = await api(`/activities/${id}`, "GET");
    } catch (e) {
      error = "Activité introuvable";
    }
  });
</script>

<main class="main">
  {#if error}
    <p>{error}</p>
  {:else if activity}
    <h2>{activity.name}</h2>
    <p>{activity.description}</p>
  {/if}
</main>