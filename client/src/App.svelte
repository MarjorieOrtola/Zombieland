<script>
  import Header from './components/Header.svelte';
  import Footer from './components/Footer.svelte';

  import Home from './routes/Home.svelte';
  import Contact from './routes/Contact.svelte';
  import Attraction from './routes/Attraction.svelte';
  import Spectacle from './routes/Spectacle.svelte';
  import Inscription from './routes/Inscription.svelte';
  import Billetterie from './routes/Billetterie.svelte';
  import Rencontre_perso from './routes/Rencontre_perso.svelte';
  import Faq from './routes/Faq.svelte';
  import Compte from './routes/Compte.svelte';
  import Connexion from './routes/Connexion.svelte';

  import Router from 'svelte-spa-router';

  const routes = {
    '/': Home,
    '/home': Home,
    '/contact': Contact,
    '/attraction': Attraction,
    '/spectacle': Spectacle,
    '/inscription': Inscription,
    '/billetterie': Billetterie,
    '/rencontre_perso': Rencontre_perso,
    '/faq': Faq,
    '/compte': Compte,
    '/connexion': Connexion,
  };
</script>

<Header />

<Router {routes} />

<Footer />
