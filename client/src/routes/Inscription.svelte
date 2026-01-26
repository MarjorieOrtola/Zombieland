<script>
  // Valeurs des inputs
  let first_name = '';
  let last_name = '';
  let mail = '';
  let password = '';
  let address = '';
  let city = '';
  let postcode = '';
  let phone_number = '';

  async function handleSubmit() {
    const user = {
      first_name,
      last_name,
      mail,
      password,
      address,
      city,
      postcode,
      phone_number
    };

    try {
      const response = await fetch("http://localhost:3000/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
      });

      const data = await response.json();

      if (!response.ok) {
        alert("Erreur : " + (data.message || "Impossible de créer le compte"));
        return;
      }
      alert("Compte créé avec succès !");
      window.location.href = "/myaccount";

      // Réinitialiser le formulaire
      first_name = last_name = mail = password = address = city = postcode = phone_number = '';
    } catch (error) {
      console.error(error);
      alert("Erreur réseau ou serveur. Vérifiez la console.");
    }
  }
</script>

<section class="main__register">
  <h2 class="register__title">Créez votre compte</h2>

  <form class="register__form" on:submit|preventDefault={handleSubmit}>
    <label class="register__form-label" for="first_name">Prénom</label>
    <input type="text" id="first_name" bind:value={first_name} required />

    <label class="register__form-label" for="nom">Nom</label>
    <input type="text" id="nom" bind:value={last_name} required />

    <label class="register__form-label" for="mail">Mail</label>
    <input type="email" id="mail" bind:value={mail} required />

    <label class="register__form-label" for="mdp">Mot de passe</label>
    <input type="password" id="mdp" bind:value={password} required />

    <label class="register__form-label" for="adresse">Adresse</label>
    <input type="text" id="adresse" bind:value={address} required />

    <label class="register__form-label" for="ville">Ville</label>
    <input type="text" id="ville" bind:value={city} required />

    <label class="register__form-label" for="code-postal">Code postal</label>
    <input type="text" id="code-postal" bind:value={postcode} required />

    <label class="register__form-label" for="phone">Téléphone</label>
    <input type="text" id="phone" bind:value={phone_number} required />

    <button class="register__form-button" type="submit">S'inscrire</button>
  </form>
</section>
