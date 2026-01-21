<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Zombieland</title>
    <link rel="stylesheet" href="src/assets/reset.css">
    <link rel="stylesheet" href="src/assets/app.css">
  </head>
  <body>
  <header class="header">
        <div class="header__class-logo">
            <img class="header__logo" src="./src/assets/img/Logozombieland.jpg" alt="Zombieland Logo" />
            <h1>Bienvenue dans le parc d'attractions Zombieland</h1>
        </div>
       <div class="header__mobile-bar">
        <button class="burger" aria-label="Ouvrir le menu">☰</button>
        <button class="header__button-login">Login</button>
        </div>

        <div class="header__class-nav">
        <nav class="header__nav">
            <ul class="header__nav-list">
                <li class="header__nav-activities"><a href="/">Activités</a>
                    <ul class="header__nav-dropdown">
                        <li class="header__nav-attractions"><a href="/">Attractions</a></li>
                        <li class="header__nav-shows"><a href="/">Spectacles</a></li>
                        <li class="header__nav-characters"><a href="/">Rencontres avec les personnages</a></li>
                    </ul>
                </li>
                <li class="header__nav-tickets"><a href="/tickets">Billeterie</a></li>
                <li class="header__nav-contact"><a href="/contact">Contact</a></li>
                <li class="header__nav-account"><a href="/mon_compte">Mon Compte</a></li>
            </ul>
        </nav>
       
    </div>
    </header>
    <main class="main">
        <section class="main__contact">
            <h2 class="contact__title" >FAQ</h2>
            <h3>Questions fréquentes</h3>
            <h4>Comment acheter des billets en ligne ?</h4>
            <p class="contact__text">Dirigez-vous vers la section "Billeterie" de notre site web, sélectionnez le type de billet souhaité, choisissez la date de votre visite, puis suivez les instructions pour finaliser votre achat en ligne.
            </p>
            <h4>Quels sont les horaires d'ouverture du parc ?</h4>
            <p class="contact__text">Zombieland est ouvert tous les jours de 09h à 22h pendant la saison estivale. En dehors de cette période, les horaires peuvent varier, veuillez consulter notre site web pour les informations les plus récentes.
            </p>
            <h4>Y a-t-il des restrictions d'âge pour entrer dans le parc?</h4>
            <p class="contact__text">Non, néamoins il est déconseillé aux personnes de moins de 16 ans de visiter le parc en raison de la thématique effrayante.
            </p>
        </section>
    </main>

    <footer class="footer">
        <button class="footer__button"><a href="/FAQ">FAQ</a></button>
        <p >Suivez-nous sur les réseaux sociaux</p>
        <!-- Rajout de Icons pour les réseaux? -->
        <p>Mention légales</p>
    </footer>
    <script type="module" src="./src/register.js"></script>
    <script type="module" src="header.js"></script>
  </body>
</html>
