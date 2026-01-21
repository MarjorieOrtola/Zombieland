<script>
  // états réactifs
  let burgerOpen = false;       // menu burger (mobile)
  let dropdownOpen = false;     // dropdown "Activités"
</script>

<header class="header">
  <div class="header__class-logo">
    <img
      class="header__logo"
      src="/src/assets/img/Logozombieland.jpg"
      alt="Zombieland Logo"
    />
    <h1>Bienvenue dans le parc d'attractions Zombieland</h1>
  </div>

  <!-- Burger menu (mobile) -->
  <div class="header__mobile-bar">
    <button
      class="burger"
      aria-label="Ouvrir le menu"
      on:click={() => {
        burgerOpen = !burgerOpen;
        if (!burgerOpen) dropdownOpen = false; // ferme le dropdown si on ferme le menu
      }}
    >
      ☰
    </button>
    <button class="header__button-login">Login</button>
  </div>

  <!-- Navigation -->
  <nav
    class="header__class-nav"
    style="display: {burgerOpen ? 'flex' : 'none'}; flex-direction: column;"
  >
    <ul class="header__nav-list">
      <li class="header__nav-activities">
        <!-- Dropdown activé au clic -->
        <a href="#"
          on:click|preventDefault={() => dropdownOpen = !dropdownOpen}
        >
          Activités
        </a>
        <ul
          class="header__nav-dropdown"
          style="display: {dropdownOpen ? 'flex' : 'none'}; flex-direction: column;"
        >
          <li><a href="/">Attractions</a></li>
          <li><a href="/">Spectacles</a></li>
          <li><a href="/">Rencontres avec les personnages</a></li>
        </ul>
      </li>
      <li><a href="/tickets">Billetterie</a></li>
      <li><a href="/contact">Contact</a></li>
      <li><a href="/mon_compte">Mon Compte</a></li>
    </ul>
  </nav>
</header>

<!-- MAIN & FOOTER restent inchangés -->
<main class="main">
  <section class="main__contact">
    <h2>Contactez-nous ☣️</h2>
    <p>Une question avant d’entrer en zone infectée ?</p>
  </section>
</main>

<footer class="footer">
  <button><a href="/FAQ">FAQ</a></button>
  <p>Suivez-nous sur les réseaux sociaux</p>
  <p>Mentions légales</p>
</footer>
