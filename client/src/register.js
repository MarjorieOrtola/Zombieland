const form = document.getElementById("registerForm");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const user = {
    first_name: document.getElementById("first_name").value.trim(),
    last_name: document.getElementById("nom").value.trim(),
    mail: document.getElementById("mail").value.trim(),
    password: document.getElementById("mdp").value.trim(),
    address: document.getElementById("adresse").value.trim(),
    city: document.getElementById("ville").value.trim(),
    postcode: document.getElementById("code-postal").value.trim(),
    phone_number: document.getElementById("phone").value.trim(),
  };

  try {
    const response = await fetch("http://localhost:3000/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    });

    const data = await response.json(); // le body sera maintenant toujours du JSON

    if (!response.ok) {
      alert("Erreur : " + (data.message || "Impossible de créer le compte"));
      return;
    }

    alert("Inscription réussie 🎉");
    console.log(data);
  } catch (error) {
    console.error(error);
    alert("Erreur réseau ou serveur. Vérifiez la console.");
  }
});
