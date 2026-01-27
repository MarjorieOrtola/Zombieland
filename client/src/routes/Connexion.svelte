<script>
  import authStore, { setAuth } from '../lib/store/authStore.js';
import { loginUser } from '../lib/services/auth.service.js';


  let mail = '';
  let password = '';
  let error = '';

 async function handleSubmitLogin() {
  try {
    const { token, user } = await loginUser({ mail, password });

    console.log("Token reçu :", token); // Debug
    console.log("User reçu :", user);   // Debug
    setAuth(user, token);
    window.location.href = '/#/compte';
  } catch (err) {
    console.error("Erreur complète :", err); // Debug
    error = err.message || 'Erreur réseau ou serveur';
  }
}
</script>

<main class="main">
  <section class="main__login">
    <h2 class="register__title">Connectez-vous</h2>

    <form class="login__form" on:submit|preventDefault={handleSubmitLogin}>
      <label class="register__form-label" for="mail">Mail</label>
      <input
        type="email"
        id="mail"
        name="mail"
        bind:value={mail}
        placeholder="Entrez votre mail"
        required
      />

      <label class="register__form-label" for="password">Mot de passe</label>
      <input
        type="password"
        id="password"
        name="password"
        bind:value={password}
        placeholder="Entrez votre mot de passe"
        required
      />

      <button class="register__form-button" type="submit">
        Se Connecter
      </button>
    </form>

    {#if error}
      <p style="color:red; margin-top:10px">{error}</p>
    {/if}
  </section>
</main>
