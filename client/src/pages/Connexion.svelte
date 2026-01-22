<script>
  let mail = "";
  let password = "";

  async function handleSubmitLogin() {
    const user = {
        mail,
        password,
    };

    try {
      const response = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
      });

      const data = await response.json();

      if (!response.ok) {
        alert("Erreur : " + (data.message || "Impossible de créer le compte"));
        return;
      }

      alert("Inscription réussie 🎉");
      console.log(data);

      // Réinitialiser le formulaire
      mail = password = '';
    } catch (error) {
      console.error(error);
      alert("Erreur réseau ou serveur. Vérifiez la console.");
    }
  }
</script>

<main class="main">
  <section class="main__login">
    <h2 class="register__title">Connectez-vous</h2>

    <form class="login__form" on:submit|preventDefault={login}>
      <label class="register__form-label" for="mail">Mail</label>
      <input type="email" id="mail" name="mail" bind:value={mail} required />

      <label class="register__form-label" for="password">Mot de passe</label>
      <input type="password" id="password" name="password" bind:value={password} required />

      <button class="register__form-button" type="submit">
        Se Connecter
      </button>
    </form>
  </section>
</main>