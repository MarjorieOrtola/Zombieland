
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

    await Activity.create({
        name: 'Massacre à la Tronconneuse',
        fear_level: 3,
        image: "tronçonneuse",
        description: 'Massacre à la Tronçonneuse est un spectacle terrifiant et immersif qui vous plonge au cœur d’un camp abandonné envahi par des zombies incontrôlables. Entre effets spéciaux saisissants, cascades spectaculaires, comédiens surgissant de l’ombre et une mise en scène haletante, chaque minute vous rapproche un peu plus de l’horreur. Le danger rôde, les survivants luttent pour leur vie, et personne n’est vraiment à l’abri… Un show intense, rythmé et visuellement impressionnant, réservé aux visiteurs les plus courageux. Oserez-vous assister au carnage… et en sortir indemne ?',
        category_id: spectacle.id,
    });
    await Activity.create({
        name: 'La survivante',
        fear_level: 2,
        image: "survivante",
        description: 'Plongez au cœur de l’aventure dans Zombieland et vivez un moment unique en rencontrant la Survivante, l’icône de la résistance et l’héroïne qui a inspiré des générations de chasseurs de zombies ! Dans un décor post-apocalyptique soigneusement recréé, vous aurez l’opportunité de discuter avec elle, d’écouter ses conseils de survie, et peut-être même de lui demander un selfie pour immortaliser cette rencontre légendaire.',
        category_id: personnage.id,
    });
    await Activity.create({
        name: 'Frankenstein',
        fear_level: 2,
        image: "frankenstein",
        description: 'Osez affronter la créature… si vous l’osez. Dans les profondeurs du Repaire Maudit de Zombieland, là où la lumière ne perce jamais, Frankenstein vous attend. Son souffle rauque résonne entre les murs couverts de moisissure, ses pas lourds font trembler le sol sous vos pieds. Il n’est pas là pour vous rassurer. Approchez-vous… si vous en avez le courage. Ses yeux jaunes, injectés de sang, vous transpercent. Sa voix grave, déchirée par des siècles de souffrance, murmure des histoires que personne ne devrait entendre. Il se souvient de chaque visage qu’il a croisé… et de ceux qu’il a perdus.',
        category_id: personnage.id,
    });

 

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
