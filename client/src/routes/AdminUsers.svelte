<script>
  import { onMount } from "svelte";
  import { getAllUsers, deleteUser } from "../lib/services/admin.service.js";

  let users = [];
  let loading = true;
  let error = "";

  async function fetchUsers() {
    try {
      const allUsers = await getAllUsers();

      // 👉 On ne garde QUE les utilisateurs (pas les admins)
      users = allUsers.filter((u) => u.role !== "admin");
      console.log(users); // <- regarde ce qui est dedans
    } catch (e) {
      error = "Impossible de charger les utilisateurs";
      console.error(e);
    } finally {
      loading = false;
    }
  }

  async function removeUser(id) {
    if (!confirm("Voulez-vous vraiment supprimer cet utilisateur ?")) return;

    try {
      await deleteUser(id);
      users = users.filter((u) => u.id !== id);
    } catch (e) {
      alert("Erreur lors de la suppression");
      console.error(e);
    }
  }

  onMount(fetchUsers);
</script>

<section class="admin-users">
  <h2>Gestion des utilisateurs</h2>

  {#if loading}
    <p>Chargement...</p>
  {:else if error}
    <p class="error">{error}</p>
  {:else if users.length === 0}
    <p>Aucun utilisateur trouvé</p>
  {:else}
    <ul class="user-list">
      {#each users as user}
        <li class="user-card">
          <div class="user-info">
            <h3>{user.first_name} {user.last_name}</h3>

            <div><strong>Email :</strong> {user.mail}</div>
            <div><strong>Téléphone :</strong> {user.phone_number}</div>
            <div>
              <strong>Adresse :</strong>
              {user.address}, {user.postcode}
              {user.city}
            </div>
          </div>

          <div class="actions">
            <button class="delete" on:click={() => removeUser(user.id)}>
              Supprimer
            </button>
          </div>
        </li>
      {/each}
    </ul>
  {/if}
</section>

<style>

 h3, h2 {
  font-family: 'Montserrat', sans-serif;
  font-weight: 600;
  color:rgba(255, 255, 255, 0.795);

}
  .admin-users {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .user-list {
    list-style: none;
    padding: 0;
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }

  .user-card {
    background: rgba(0, 0, 0, 0.4);
    padding: 0.75rem;
    border-radius: 4px;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .user-info h3 {
    margin: 0;
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
    cursor: pointer;
  }

  .delete:hover {
    background-color: #d32f2f;
  }

  .error {
    color: #ff6b6b;
  }

  @media (min-width: 768px) {
    .user-card {
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
    }
  }
</style>
