<script>
  import { onMount } from "svelte";
  import { getAllUsers, deleteUser } from "../lib/services/admin.service.js";

  let users = [];
  let loading = true;
  let error = "";

  async function fetchUsers() {
    try {
      users = await getAllUsers();
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
      users = users.filter(u => u.id !== id);
    } catch (e) {
      alert("Erreur lors de la suppression");
      console.error(e);
    }
  }

  onMount(fetchUsers);
</script>

<h2>Utilisateurs</h2>

{#if loading}
  <p>Chargement...</p>
{:else if error}
  <p>{error}</p>
{:else if users.length === 0}
  <p>Aucun utilisateur trouvé</p>
{:else}
  <table>
    <thead>
      <tr>
        <th>ID</th>
        <th>Nom</th>
        <th>Email</th>
        <th>Role</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      {#each users as user}
        <tr>
          <td>{user.id}</td>
          <td>{user.first_name} {user.last_name}</td>
          <td>{user.mail}</td>
          <td>{user.role}</td>
          <td>
            <button on:click={() => removeUser(user.id)}>Supprimer</button>
          </td>
        </tr>
      {/each}
    </tbody>
  </table>
{/if}
