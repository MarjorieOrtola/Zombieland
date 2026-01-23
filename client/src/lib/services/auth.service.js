// C’est la couche métier (service) dédiée à l’authentification côté front.
// Il sert à :
// communiquer avec les routes / du backend
// centraliser la logique login / register / me
// éviter de mettre des fetch() dans les composants Svelte
// faire le lien entre API et authStore

import api from "../api";

export const registerUser = async (user) => {
  return await api("/register", "POST", user);
};

export const loginUser = async (credentials) => {

  // credentials : un objet littéral avec clé username et password pour le nom et le mdp de connexion
  // exemple : { username: 'Josiane', password: 'azertyuiop' }
  const { token } = await api("/login", "POST", credentials);

  // affiche le token
  // le token est représenté par une grande chaîne de caractères
  // console.log(token);
  // alert(token);

  // Demande des informations de l'utilisateur : username + role
  const user = await fetch(`${import.meta.env.VITE_API_URL}/myaccount`, {
    method: "GET",
    headers: {
      // entête sous forme de clé / valeur ==> Authorization: "Bearer <token>"
      Authorization: `Bearer ${token}`, // Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxLCJpYXQiOjE3NjU5NjEzNzcsImV4cCI6MTc2NTk2NDk3N30.t9_Iare4Fh7CG59hpjHtSesnbAG1HzEFErAI5hNtdVo
    },
  })
  .then((res) => res.json());

  // console.log(user);
  // alert(JSON.stringify(user));


  return { token, user };

  // return { token };
};

export const getUser = async () => {
  return await api("/myaccount", "GET");
};