<script>
  import Header from './components/Header.svelte';
  import Footer from './components/Footer.svelte';
  import Attraction from './pages/Attraction.svelte';
  import Spectacle from './pages/Spectacle.svelte';
  import Inscription from './pages/Inscription.svelte';
  import Rencontre_perso from './pages/Rencontre_perso.svelte';
  import Contact from './pages/Contact.svelte';
  import Home from './pages/Home.svelte';
  import Billetterie from './pages/Billetterie.svelte';
  import Faq from './pages/Faq.svelte';
  import Compte from './pages/Compte.svelte';
  import Connexion from './pages/Connexion.svelte';

  import Router from 'svelte-spa-router';

  let page = 'Inscription';

  const pages = { Contact, Attraction, Home, Spectacle, Inscription, Billetterie, Rencontre_perso, Faq, Compte, Connexion};

  const routes = {
    '/contact': Contact,
    '/attraction': Attraction,
    '/home': Home,
    '/spectacle': Spectacle,
    '/inscription': Inscription,
    '/billetterie': Billetterie,
    '/rencontre_perso': Rencontre_perso,
    '/faq': Faq,
    '/compte': Compte,
    '/connexion': Connexion,
  };

  function navigate(to) {
    page = to;
  }
</script>

<Header {navigate} />

<svelte:component this={pages[page]} />

<Router {routes} />

<Footer navigate={navigate} />

