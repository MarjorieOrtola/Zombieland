<script>
  export let navigate;

  let menuOpen = false;
  let dropdownOpen = false;

  function toggleMenu() { menuOpen = !menuOpen; }
  function toggleDropdown(e) { e.preventDefault(); dropdownOpen = !dropdownOpen; }

  function goTo(page) {
    navigate(page);
    menuOpen = false;
    dropdownOpen = false;
  }

  function closeAll() {
    menuOpen = false;
    dropdownOpen = false;
  }
</script>

<!-- Svelte:window doit être au niveau du composant, pas à l'intérieur du header -->
<svelte:window on:click={closeAll} />

<header class="header">
  <!-- Logo + titre -->
  <div class="header__class-logo">
    <img class="header__logo" src="/img/Logozombieland.jpg" alt="Zombieland Logo" />
    <h1>Bienvenue dans le parc d'attractions Zombieland</h1>
  </div>

  <!-- Mobile bar : burger + login -->
  <div class="header__mobile-bar">
    <button class="burger" aria-label="Ouvrir le menu" on:click|stopPropagation={toggleMenu}>☰</button>

    <button class="header__button-login">Login</button>
  </div>

  <!-- Nav -->
  <nav class="header__class-nav" class:open={menuOpen} on:click|stopPropagation>
    <ul class="header__nav-list">
      <li><a href="#" on:click|preventDefault={() => goTo('Home')}>Acceuil</a></li>
      <li class="header__nav-activities">
        <a href="#" role="button" on:click|preventDefault={toggleDropdown}>Activités</a>
        {#if dropdownOpen}
          <ul class="header__nav-dropdown">
            <li><a href="#" on:click|preventDefault={() => goTo('Attraction')}>Attractions</a></li>
            <li><a href="#" on:click|preventDefault={() => goTo('Spectacle')}>Spectacles</a></li>
            <li><a href="#" on:click|preventDefault={() => goTo('Rencontre_perso')}>Rencontres personnages</a></li>
          </ul>
        {/if}
      </li>
      <li><a href="#" on:click|preventDefault={() => goTo('Tickets')}>Billetterie</a></li>
      <li><a href="#" on:click|preventDefault={() => goTo('Contact')}>Contact</a></li>
      <li><a href="#" on:click|preventDefault={() => goTo('Compte')}>Mon Compte</a></li>
      <li><a href="#" on:click|preventDefault={() => goTo('Inscription')}>Inscription</a></li>
    </ul>
  </nav>
</header>