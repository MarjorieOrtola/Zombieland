<script>
  let menuOpen = false;
  let dropdownOpen = false;

  function toggleMenu() {
    menuOpen = !menuOpen;
  }

  function toggleDropdown() {
    dropdownOpen = !dropdownOpen;
  }

  function closeAll() {
    menuOpen = false;
    dropdownOpen = false;
  }
</script>

<svelte:window on:click={closeAll} />

<header class="header">
  <div class="header__class-logo">
    <img class="header__logo" src="/img/Logozombieland.jpg" alt="Zombieland Logo" />
    <h1>Bienvenue dans le parc d'attractions Zombieland</h1>
  </div>

  <div class="header__mobile-bar">
    <button
      class="burger"
      aria-label="Ouvrir le menu"
      on:click|stopPropagation={toggleMenu}
    >
      ☰
    </button>

    <a class="header__button-login" href="/#/connexion">
      Login
    </a>
  </div>

  <nav class="header__class-nav" class:open={menuOpen}>
    <ul class="header__nav-list">
      <li><a href="/" on:click={closeAll}>Accueil</a></li>

      <li class="header__nav-activities">
        <button
          type="button"
          class="header__nav-button"
          on:click|stopPropagation={toggleDropdown}
        >
          Activités
        </button>

        {#if dropdownOpen}
          <ul class="header__nav-dropdown">
            <li><a href="/#/attraction" on:click={closeAll}>Attractions</a></li>
            <li><a href="/#/spectacle" on:click={closeAll}>Spectacles</a></li>
            <li><a href="/#/rencontre_perso" on:click={closeAll}>Rencontres personnages</a></li>
          </ul>
        {/if}
      </li>

      <li><a href="/#/billetterie" on:click={closeAll}>Billetterie</a></li>
      <li><a href="/#/contact" on:click={closeAll}>Contact</a></li>
      <li><a href="/#/compte" on:click={closeAll}>Mon Compte</a></li>
      <li><a href="/#/inscription" on:click={closeAll}>Inscription</a></li>
    </ul>
  </nav>
</header>

<style>
.header__class-nav a,
.header__nav-button {
  background: none;
  border: none;
  color: var(--color-text);
  font-family: inherit;
  font-size: inherit;
  padding: 0.5rem 1rem;
  cursor: pointer;
  text-align: left;
}

.header__class-nav a:hover,
.header__class-nav a:focus,
.header__nav-button:hover,
.header__nav-button:focus {
  background-color: rgba(255, 255, 255, 0.1);
}

</style>