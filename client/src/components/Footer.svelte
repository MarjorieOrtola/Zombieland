<script> 
  export let navigate;

  function goTo(page) {
    navigate(page);
  }
</script>

<footer class="footer">
  <!-- Lien FAQ -->
<a href="#" on:click|preventDefault={() => goTo('Faq')}>FAQ</a>

  <p>Suivez-nous sur les réseaux sociaux</p>

  <!-- Ici tu peux ajouter tes icônes réseaux sociaux -->
  <div class="footer__social">
    <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">FB</a>
    <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">TW</a>
    <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">IG</a>
  </div>
</footer>


