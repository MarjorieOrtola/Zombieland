<script>
  import { onMount } from "svelte";
  import {
    getAllActivities,
    createActivity,
    updateActivity,
    deleteActivity,
  } from "../lib/services/admin.service.js";

  let activities = [];
  let loading = true;
  let error = "";

  /* =====================
     CATEGORIES
  ===================== */
  const categories = [
    { id: 1, name: "Attraction" },
    { id: 2, name: "Spectacle" },
    { id: 3, name: "Rencontre personnage" },
  ];

  /* =====================
     MODAL STATE
  ===================== */
  let showModal = false;
  let editingActivity = null;

  let form = {
    name: "",
    fear_level: "",
    category_id: "",
    image: "",
  };

  function openCreateModal() {
    editingActivity = null;
    form = {
      name: "",
      fear_level: "",
      category_id: "",
      image: "",
    };
    showModal = true;
  }

  function openEditModal(activity) {
    editingActivity = activity;

    form = {
      name: activity.name ?? "",
      // conversion en string pour que le select fonctionne
      fear_level: activity.fear_level ? String(activity.fear_level) : "",
      category_id: activity.category_id ? String(activity.category_id) : "",
      image: activity.image ?? "",
    };

    showModal = true;
  }

  function closeModal() {
    showModal = false;
  }

  /* =====================
     API
  ===================== */
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

  async function saveActivity() {
    if (!form.name || !form.category_id || !form.fear_level) {
      alert("Nom, catégorie et niveau de peur obligatoires");
      return;
    }

    const payload = {
      ...form,
      fear_level: Number(form.fear_level),
      category_id: Number(form.category_id),
    };

    try {
      if (editingActivity) {
        const updated = await updateActivity(editingActivity.id, payload);
        activities = activities.map((a) =>
          a.id === editingActivity.id ? updated : a
        );
      } else {
        const created = await createActivity(payload);
        activities = [...activities, created];
      }

      closeModal();
    } catch (e) {
      alert("Erreur lors de l’enregistrement");
      console.error(e);
    }
  }

  async function removeActivity(id) {
    if (!confirm("Supprimer cette activité ?")) return;

    try {
      await deleteActivity(id);
      activities = activities.filter((a) => a.id !== id);
    } catch (e) {
      alert("Erreur lors de la suppression");
      console.error(e);
    }
  }

  onMount(fetchActivities);
</script>

<section class="admin-activities">
  <h2>Gestion des activités</h2>

  <button class="add" on:click={openCreateModal}>
    + Ajouter une activité
  </button>

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
              Niveau de peur : {activity.fear_level}<br />
              Catégorie : {activity.category?.name ?? "—"}
            </p>
            <img
              class="activity__img"
              src={`/img/${activity.image}.jpg`}
              alt={activity.name}
            />
          </div>

          <div class="actions">
            <button on:click={() => openEditModal(activity)}> Modifier </button>
            <button class="delete" on:click={() => removeActivity(activity.id)}>
              Supprimer
            </button>
          </div>
        </li>
      {/each}
    </ul>
  {/if}
</section>

<!-- =====================
     MODAL
===================== -->
{#if showModal}
  <div class="modal-overlay" on:click={closeModal}>
    <div class="modal" on:click|stopPropagation>
      <h3>
        {editingActivity ? "Modifier l’activité" : "Ajouter une activité"}
      </h3>

      <input placeholder="Nom" bind:value={form.name} />

      <!-- SELECT NIVEAU DE PEUR -->
      <select bind:value={form.fear_level}>
        <option value="" disabled hidden>Choisir le niveau de peur</option>
        <option value="1">1 – Très faible</option>
        <option value="2">2 – Faible</option>
        <option value="3">3 – Moyen</option>
        <option value="4">4 – Élevé</option>
        <option value="5">5 – Très élevé</option>
      </select>

      <!-- SELECT CATEGORIE -->
      <select bind:value={form.category_id}>
        <option value="" disabled hidden>Choisir une catégorie</option>
        {#each categories as cat}
          <option value={String(cat.id)}>{cat.name}</option>
        {/each}
      </select>

      <input placeholder="Image (sans .jpg)" bind:value={form.image} />

      <div class="modal-actions">
        <button on:click={saveActivity}> Enregistrer </button>
        <button class="cancel" on:click={closeModal}> Annuler </button>
      </div>
    </div>
  </div>
{/if}

<style>
  h3, h2 {
  font-family: 'Montserrat', sans-serif;
  font-weight: 600;
  color:rgba(255, 255, 255, 0.795);

}
  .admin-activities {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .add {
    align-self: flex-start;
    background-color: #1976d2;
    color: white;
    border: none;
    padding: 0.4rem 0.8rem;
    cursor: pointer;
  }

  .add:hover {
    background-color: #1e88e5;
  }

  .activity-list {
    list-style: none;
    padding: 0;
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }

  .activity-card {
    background: rgba(0, 0, 0, 0.4);
    padding: 0.75rem;
    border-radius: 4px;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .actions {
    display: flex;
    gap: 0.5rem;
  }

  .delete {
    background-color: #b00020;
    color: white;
    border: none;
    padding: 0.3rem 0.6rem;
  }

  .delete:hover {
    background-color: #d32f2f;
  }

  .modal-overlay {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.7);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
  }

  .modal {
    background: #111;
    padding: 1rem;
    border-radius: 6px;
    width: 90%;
    max-width: 400px;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .modal input,
  .modal select {
    padding: 0.4rem;
  }

  .modal-actions {
    display: flex;
    justify-content: flex-end;
    gap: 0.5rem;
  }

  .cancel {
    background: transparent;
    border: 1px solid #999;
    color: #999;
  }

  .cancel:hover {
    color: white;
    border-color: white;
  }

  .error {
    color: #ff6b6b;
  }

  @media (min-width: 768px) {
    .activity-card {
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
    }
  }
</style>
