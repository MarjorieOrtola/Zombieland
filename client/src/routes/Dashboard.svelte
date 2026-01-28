<script>
  import AdminUsers from './AdminUsers.svelte';
  import AdminActivities from './AdminActivities.svelte';
  import AdminReservations from './AdminReservations.svelte';

  let activeTab = 'users';       // onglet par défaut
  let menuOpen = false;          // burger menu mobile

  const tabs = [
    { key: 'users', label: 'Utilisateurs' },
    { key: 'activities', label: 'Activités' },
    { key: 'reservations', label: 'Réservations' }
  ];

  function setTab(tabKey) {
    activeTab = tabKey;
    menuOpen = false; // fermer le menu mobile après clic
  }
</script>

<style>
.dashboard {
  display: flex;
  min-height: 100vh;
  background-color: var(--primary);
  color: var(--color-text);
  flex-direction: column; /* mobile first */
}

.burger {
  display: block;
  padding: 0.5rem;
  background: var(--color-button);
  border: none;
  color: var(--color-text);
  font-size: 1.5rem;
  cursor: pointer;
  margin: 0.5rem;
}

.sidebar {
  position: absolute;
  top: 0;
  left: -250px;  /* caché par défaut */
  width: 220px;
  height: 100%;
  background: rgba(0,0,0,0.8);
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  transition: left 0.3s;
  z-index: 1000;
}

.sidebar.open {
  left: 0;
}

.sidebar button {
  background: none;
  border: none;
  color: var(--color-text);
  text-align: left;
  padding: 0.5rem;
  cursor: pointer;
  font-size: 1rem;
}

.sidebar button.active {
  font-weight: bold;
  border-left: 3px solid var(--color-title-red);
}

.content {
  flex: 1;
  padding: 1rem;
  margin-top: 3rem; /* espace burger menu */
}

/* Desktop */
@media(min-width:768px){
  .dashboard {
    flex-direction: row;
  }
  .burger {
    display: none;
  }
  .sidebar {
    position: relative;
    left: 0;
    height: auto;
  }
  .content {
    margin-top: 0;
    padding: 2rem;
  }
}
</style>

<div class="dashboard">
  <!-- Burger menu mobile -->
  <button class="burger" on:click={() => menuOpen = !menuOpen}>☰</button>

  <!-- Sidebar onglets -->
  <nav class="sidebar" class:open={menuOpen}>
    {#each tabs as tab}
      <button
        class:active={activeTab === tab.key}
        on:click={() => setTab(tab.key)}
      >
        {tab.label}
      </button>
    {/each}
  </nav>

  <!-- Contenu -->
  <main class="content">
    {#if activeTab === 'users'}
      <AdminUsers />
    {:else if activeTab === 'activities'}
      <AdminActivities />
    {:else if activeTab === 'reservations'}
      <AdminReservations />
    {/if}
  </main>
</div>
