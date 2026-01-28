
import dotenv from "dotenv";
import argon2 from 'argon2';
import sequelize from "../models/sequelize.client.js";
import { Activity, Category, User, Ticket, Reservation } from "../models/index.js";

async function seed() {
  console.log('Syncing database...');

  try {
    // Création des catégories
    const attraction = await Category.create({ name: 'attraction' });
    const spectacle = await Category.create({ name: 'spectacle' });
    const personnage = await Category.create({ name: 'personnage' });

    // Création des activités
    const deadRise = await Activity.create({
      name: 'Dead Rise',
      fear_level: 5,
      image: "dead_rise",
      description: 'Dead Rise est un roller coaster terrifiant...',
      category_id: attraction.id,
    });
    console.log(deadRise.id);

    // (Autres activités...)
    await Activity.create({
      name: 'Le labyrinthe des Zombies',
      fear_level: 4,
      image: "labyrinthe",
      description: 'Le Labyrinthe des Zombies plonge les visiteurs...',
      category_id: attraction.id,
    });

    await Activity.create({
      name: 'Le lâcher de Zombies',
      fear_level: 4,
      image: "lacher_zombies",
      description: 'Le Lâcher de Zombies est un spectacle immersif...',
      category_id: spectacle.id,
    });

    // ... ajoute le reste des activités ici

    // === HASH DES MOTS DE PASSE ===
const hashedUserPassword = await argon2.hash("azerty123");
const hashedAdminPassword = await argon2.hash("admin123");

    // Création d'un utilisateur
    const user = await User.create({
      first_name: 'Frank',
      last_name: 'Kenstein',
      password: hashedUserPassword, // mot de passe hashé
      mail: 'frankenstein@gmail.com',
      address: '30 rue de la grande avenue',
      postcode: '95041',
      city: 'Paris',
      phone_number: '0123456789',
    });

    // Création d'un admin
    const admin = await User.create({
      first_name: "Zombieland",
      last_name: "Admin",
      mail: "admin@zombieland.com",
      password: hashedAdminPassword, // mot de passe hashé
      role: "admin",
      address: '56 rue des Lilas',
      postcode: '95041',
      city: 'Paris',
      phone_number: '0187350913',
    });
    console.log("Admin créé !", admin.mail);

    // Création d'un ticket
    const ticket = await Ticket.create({
      name: 'Entrée unique',
      price: 50.00,
      date_entrance: new Date(),
    });

    // Création d'une réservation pour l'utilisateur
    const randomReference = Math.floor(100000 + Math.random() * 900000);
    await user.addTicket(ticket, {
      through: {
        quantity: 2,
        reference: randomReference,
        date_entrance: new Date(),
      },
    });

    console.log('✅ Seeding complete!');
  } catch (error) {
    console.log('Error seeding BDD', error);
  } finally {
    await sequelize.close();
  }
}

await seed();
