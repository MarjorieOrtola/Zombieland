<script>
  import { onMount } from "svelte";
  import api from "../lib/api";
  import { push } from "svelte-spa-router";

  let activities = [];
  let error = "";
  let loading = true;

  // Récupère toutes les attractions depuis le backend
  onMount(async () => {
    try {
      activities = await api("/attractions"); // backend route pour toutes les attractions
    } catch (e) {
      console.error(e);
      error = "Impossible de récupérer les attractions";
    } finally {
      loading = false;
    }
  });

  function goToDetail(id) {
    push(`/detail/${id}`);
  }
</script>

<main class="main">
  {#if loading}
    <p>Chargement des attractions...</p>
  {:else if error}
    <p>{error}</p>
  {:else}
    {#each activities as activity}
      <section class="main__activity">
        <h2 class="activity__title">{activity.name}</h2>
                 <!-- ajouter imageUrl dans le backend -->
        <img class="activity__img" src={activity.imageUrl} alt={activity.name} />
        <button class="main__button-info" on:click={() => goToDetail(activity.id)}>
          Plus d'informations
        </button>
      </section>
    {/each}
  {/if}
</main>