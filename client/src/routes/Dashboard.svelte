<script>
  import { clearAuth } from "../lib/store/authStore.js";
  import { push } from "svelte-spa-router";

  import AdminUsers from "./AdminUsers.svelte";
  import AdminActivities from "./AdminActivities.svelte";
  import AdminReservations from "./AdminReservations.svelte";

  // Onglet actif
  let activeTab = "users";

  function logout() {
    clearAuth();
    push("/connexion");
  }
</script>

<!-- =====================
     DASHBOARD
===================== -->
<section class="dashboard">

  <!-- Header -->
  <header class="dashboard__header">
    <h1>Dashboard Admin</h1>

  </header>

  <!-- Tabs -->
  <nav class="tabs">
    <button
      class:active={activeTab === "users"}
      on:click={() => activeTab = "users"}>
      Utilisateurs
    </button>

    <button
      class:active={activeTab === "activities"}
      on:click={() => activeTab = "activities"}>
      Activités
    </button>

    <button
      class:active={activeTab === "reservations"}
      on:click={() => activeTab = "reservations"}>
      Réservations
    </button>
  </nav>

  <!-- Content -->
  <main class="content">
    {#if activeTab === "users"}
      <AdminUsers />
    {:else if activeTab === "activities"}
      <AdminActivities />
    {:else}
      <AdminReservations />
    {/if}
  </main>

</section>

<style>
/* =====================
   MOBILE FIRST
===================== */


.dashboard {
  min-height: 100vh;
  padding: 1rem;
  background-color: var(--primary);
  color: white; /* ⚡ Texte blanc pour tout le dashboard */
  font-family: 'Montserrat', sans-serif;
}

/* Header */
.dashboard__header {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 1rem;
}

.dashboard__header h1 {
  font-size: 1.4rem;
  font-family: 'Montserrat', sans-serif;
  font-weight: 600;
  color: rgb(177, 166, 166);
}


/* Logout */
.logout {
  align-self: flex-start;
  background-color: #b00020;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  cursor: pointer;
}

.logout:hover {
  background-color: #d32f2f;
}

/* Tabs */
.tabs {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.tabs button {
  flex: 1;
  background: #8b0202;
  color: var(--color-text);
  padding: 0.5rem;
  cursor: pointer;
}

.tabs button.active {
  background-color: #d1060677;
  border-color: white;
}

/* Content */
.content {
  background-color: rgba(0,0,0,0.3);
  padding: 1rem;
  border-radius: 4px;
  color: white;
  
}


/* =====================
   DESKTOP
===================== */
@media (min-width: 768px) {
  .dashboard {
    padding: 2rem;
  }

  .dashboard__header {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }

  .tabs button {
    flex: none;
    padding: 0.5rem 1.5rem;
  }
}
</style>
