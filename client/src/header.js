// ===== MENU BURGER & DROPDOWN =====

// éléments
const burger = document.querySelector('.burger');
const nav = document.querySelector('.header__class-nav');
const activities = document.querySelector('.header__nav-activities');
const dropdown = activities.querySelector('.header__nav-dropdown');

/* au clic, on va faire un 'toggle' pour ouvrir et fermer le menu burger
On a ici un opérateur ternaire: "?" , une version courte du if/else.
Donc ici: si le menu déroulant est actuellement "flex" on le cache: none
si le menu déroulant est caché : on l'affiche: flex */

// Menu burger (mobile)

burger.addEventListener('click', () => {
  nav.style.display = nav.style.display === 'flex' ? 'none' : 'flex';
  nav.style.flexDirection = 'column';
});


/*Tu utilises activities.querySelector('a') pour ajouter un écouteur d'événement (addEventListener) sur le lien "Activités". Cela permet de déclencher l'affichage/masquage du dropdown uniquement quand on clique sur le texte "Activités", et non sur toute la zone du <li>.*/

// Dropdown "Activités" (desktop)
activities.querySelector('a').addEventListener('click', (e) => {
  e.preventDefault(); // empêche le lien de naviguer
  dropdown.style.display = dropdown.style.display === 'flex' ? 'none' : 'flex';
  dropdown.style.flexDirection = 'column';
});

// Fermer menu si clic en dehors version mobile
document.addEventListener('click', (e) => {
  if (!nav.contains(e.target) && !burger.contains(e.target) && !activities.contains(e.target)) {
    nav.style.display = 'none';
    dropdown.style.display = 'none';
  }
});

