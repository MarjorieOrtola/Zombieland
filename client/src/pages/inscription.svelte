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
        <section class="main__register">
            <h2 class="register__title" >Créez votre compte</h2>

  <form class="register__form" id="registerForm" action="/register" method="POST">
    <h2></h2>
    <label class ="register__form-label" for="first_name">Prénom</label>
    <input type="text" id="first_name" name="first_name" required>

    <label class ="register__form-label" for="nom">Nom</label>
    <input type="text" id="nom" name="last_name" required>

    <label class ="register__form-label" for="mail">Mail</label>
    <input type="text" id="mail" name="mail" required>

    <label class ="register__form-label" for="mdp">Mot de passe</label>
    <input type="password" id="mdp" name="password" required>

    <label class ="register__form-label" for="adresse">Adresse</label>
    <input type="text" id="adresse" name="address" required>

    <label class ="register__form-label" for="ville">Ville</label>
    <input type="text" id="ville" name="city" required>

    <label class ="register__form-label" for="code-postal">Code postal</label>
    <input type="text" id="code-postal" name="postcode" required>

    <label class="register__form-label" for="phone">Téléphone</label>
    <input type="text" id="phone" name="phone_number" required>


    <button class="register__form-button" type="submit">S'inscrire</button>
  </form>
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