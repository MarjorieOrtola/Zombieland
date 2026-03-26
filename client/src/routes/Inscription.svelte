<script>
import { registerUser } from "../lib/services/auth.service";

let first_name = "";
let last_name = "";
let mail = "";
let password = "";
let address = "";
let city = "";
let postcode = "";
let phone_number = "";

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
    await registerUser(user);

    alert("Compte créé avec succès !");
    window.location.href = "/#/compte";

    // Réinitialiser le formulaire
    first_name = "";
    last_name = "";
    mail = "";
    password = "";
    address = "";
    city = "";
    postcode = "";
    phone_number = "";

  } catch (error) {
    console.error(error);
    alert("Erreur : " + error.message);
  }
}
</script>

<section class="main__register">
  <h2 class="register__title">Créez votre compte</h2>
  <p class="equired">
  Les champs marqués d’un * sont obligatoires
</p>

  <form class="register__form" on:submit|preventDefault={handleSubmit}>
    <label class="register__form-label" for="first_name">Prénom*</label>
    <input type="text" id="first_name" bind:value={first_name} required />

    <label class="register__form-label" for="nom">Nom*</label>
    <input type="text" id="nom" bind:value={last_name} required />

    <label class="register__form-label" for="mail">Mail*</label>
    <input type="email" id="mail" bind:value={mail} required />

    <label class="register__form-label" for="mdp">Mot de passe*</label>
    <input type="password" id="mdp" bind:value={password} required />
    <p class="register__constrain">Le mot de passe doit contenir minimum 12 caractères</p>

    <label class="register__form-label" for="adresse">Adresse</label>
    <input type="text" id="adresse" bind:value={address}/>

    <label class="register__form-label" for="ville">Ville</label>
    <input type="text" id="ville" bind:value={city}/>

    <label class="register__form-label" for="code-postal">Code postal</label>
    <input type="text" id="code-postal" bind:value={postcode}/>

    <label class="register__form-label" for="phone">Téléphone</label>
    <input type="text" id="phone" bind:value={phone_number} />

    <button class="register__form-button" type="submit">S'inscrire</button>
  </form>
</section>

<style>

.register__constrain {
  font-size: 0.85rem;
  background-color: black;
  color: #ebe1e1;
  margin-top: 4px;
}

.required {
  color: red;
  margin-left: 4px;
}
</style>