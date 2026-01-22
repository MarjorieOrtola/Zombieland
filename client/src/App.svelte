<script>
  import Header from './components/Header.svelte';
  import Footer from './components/Footer.svelte';
  import Attraction from './pages/Attraction.svelte';
  import Contact from './pages/Contact.svelte';

  let page = 'Attraction';

  const pages = { Contact, Attraction };

  function navigate(to) {
    page = to;
  }
</script>

<Header {navigate} />

<svelte:component this={pages[page]} />

<Footer />