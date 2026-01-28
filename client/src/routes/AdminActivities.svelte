<script>
  import { onMount } from "svelte";
  import {getAllActivities, deleteActivity } from "../lib/services/admin.service.js";

  let activities = [];
  let loading = true;
  let error = "";

  async function fetchActivities() {
    try {
      activities = await getAllActivities();
    } catch (e) {
      error = "Impossible de charger les activités";
      console.error(e);
    } finally {
      loading = false;
    }
  }

  async function removeActivity(id) {
    if (!confirm("Supprimer cette activité ?")) return;

    try {
      await deleteActivity(id);
      activities = activities.filter(a => a.id !== id);
    } catch (e) {
      alert("Erreur lors de la suppression");
      console.error(e);
    }
  }

  onMount(fetchActivities);
</script>

<section class="admin-activities">
  <h2>Gestion des activités</h2>

  {#if loading}
    <p>Chargement...</p>

  {:else if error}
    <p class="error">{error}</p>

  {:else if activities.length === 0}
    <p>Aucune activité trouvée</p>

  {:else}
    <ul class="activity-list">
      {#each activities as activity}
        <li class="activity-card">
          <div class="activity-info">
            <h3>{activity.name}</h3>
            <p>
              Niveau de peur : {activity.fear_level} <br />
              Catégorie : {activity.category.name}
            </p>
            <img
                class="activity__img"
                src={`/img/${activity.image}.jpg`}
                alt={activity.name}
            />
          </div>

          <button
            class="delete"
            on:click={() => removeActivity(activity.id)}>
            Supprimer
          </button>
        </li>
      {/each}
    </ul>
  {/if}
</section>

<style>
/* =====================
   MOBILE FIRST
===================== */

.admin-activities {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.admin-activities h2 {
  font-size: 1.2rem;
}

/* Liste */
.activity-list {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  padding: 0;
  list-style: none;
}

/* Carte activité */
.activity-card {
  background-color: rgba(0,0,0,0.4);
  padding: 0.75rem;
  border-radius: 4px;

  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.activity-info h3 {
  margin: 0;
  font-size: 1rem;
}

.activity-info p {
  margin: 0;
  font-size: 0.9rem;
  opacity: 0.9;
}

/* Bouton delete */
.delete {
  align-self: flex-start;
  background-color: #b00020;
  color: white;
  border: none;
  padding: 0.4rem 0.8rem;
  cursor: pointer;
}

.delete:hover {
  background-color: #d32f2f;
}

.error {
  color: #ff6b6b;
}

/* =====================
   DESKTOP
===================== */
@media (min-width: 768px) {
  .activity-card {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }

  .delete {
    align-self: center;
  }
}
</style>
