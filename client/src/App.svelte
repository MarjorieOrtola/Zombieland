<script>
  import Header from './components/Header.svelte';
  import Footer from './components/Footer.svelte';
  import Router from 'svelte-spa-router';
  import authStore from './lib/store/authStore.js'; // Import du store (pas besoin de getAuth)

  // Import des pages
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
  import Detail from './routes/Detail.svelte';

  // Pas besoin d'appeler getAuth(), l'état est déjà restauré à l'import du store

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
    '/detail/:id' : Detail,
  };
</script>

<Header />
<Router {routes} />
<Footer />
