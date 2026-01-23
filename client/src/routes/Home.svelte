<script>
const activities = [
    {
      title: 'DEAD RISE',
      img: '/img/deadrise.jpg'
    },
    {
      title: 'PLAN DU SITE',
      img: '/img/plan.png'
    }
  ];
</script>
    <main class="main">
        <section class="main__presentation">
            <h2 class="presentation__title" >Entrez vivant.</h2>
            <h2> Ressortez… si vous pouvez.</h2>
            <p class="presentation__text">Bienvenue à Zombieland, le parc d’attractions où vos frissons prennent vie ! 🧟‍♂️ Ici, l’adrénaline coule à flots entre manèges terrifiants, décors post-apocalyptiques et rencontres plus vraies que nature avec nos habitants un peu… particuliers. Osez franchir nos portes, riez, criez, et plongez dans une aventure immersive où chaque pas vous rapproche d’un souvenir inoubliable. Bonne survie… et surtout, amusez-vous !</p>
        </section>
  {#each activities as activity}
    <section class="main__activity">
      <h2 class="activity__title">{activity.title}</h2>

      <img class="activity__img" src={activity.img} alt="Image du parc" />
    </section>
  {/each}
  <h4>Horaires d'ouverture du parc</h4>
    <p class="contact__address">Du lundi au vendredi : 10h - 21h
    </p>
    <p class="contact__address">Le week-end : 10h - 23h
    </p>
    </main>
