import { User, Reservation, Ticket } from "../models/index.js";
import HttpError from "../utils/HttpError.js";
import argon2 from "argon2";
import jwt from "jsonwebtoken";

// import dotenv pour lire le fichier .env
import "dotenv/config";

const authController = {
  async registerUser(req, res, next) {
    try {
      // 1. récupérer le body de la requête
      // Dans le body j'attends les données du nouvel utilisateur à enregsitrer
      const dataJson = req.body;

      // 2 Vérifier si l'adresse mail de l'utilisateur existe déjà dans la BDD
      // Si oui, refuser l'enregistrement et renvoyer une erreur 409
      // Rechercher dans la BDD un utilsateur par son mail
      // SELECT * FROM user ... WHERE blabla
      const result = await User.findOne({
        // WHERE username = dataJson.username
        where: { mail: dataJson.mail },
      });
      if (result) {
        // result n'est pas null ! J'ai déjà un utilisateur avec cette adresse dans la BDD
        throw new HttpError("Username already exists", 409);
      }

      // 3. Calculer le hash du mot de passe
      const hash = await argon2.hash(dataJson.password);

      // 4. Enregistrer le nouvel utilisateur dans la BDD avec le hash du mdp
      const newUser = await User.create({
        first_name: dataJson.first_name,
        last_name: dataJson.last_name,
        password: hash,
        mail: dataJson.mail,
        role: "user",
        address: dataJson.address,
        city: dataJson.city,
        postcode: dataJson.postcode,
        phone_number: dataJson.phone_number,
      });

      // 5. Si l'enregistrement a échoué ==> renvoyer une erreur 500
      // newUser est null ==> l'ajout de l'utilisateur a échoué
      if (!newUser) {
        const errorNotFound = new HttpError(`Aucun utilisateur créé`, 500);
        // J'ai créé une nouvelle erreur, je vais la lancer pour qu'elle soit attrapée par le catch
        // toutes les instruction après le throw ne seront pas exécutées
        throw errorNotFound;
      }

      // 6. Si l'enregistrement a réussi ==> renvoyer l'utilisateur avec un code 201
      // Juste renvoyer l'ID de l'utilisateur. Toutes les autres infos sont "trop" personnelles et ne doivent pas
      // circuler sur le réseau
      res.status(201).json({
        // Je renvois uniquement l'ID du nouvel utilisateur
        id: newUser.id,
      });
    } catch (error) {
      next(error);
    }
  },

  async login(req, res, next) {
    try {
      // 1. récupérer le body de la requête
      // Dans le body j'attends les données du nouvel utilisateur à enregistrer
      // dataJson = { username: "....", password: "....." }
      const dataJson = req.body;

      // 2. Chercher le user selon son nom
      // SELECT * FROM user ... WHERE username = dataJson.username
      const userFromBDD = await User.findOne({
        // WHERE mail = dataJson.mail
        where: { mail: dataJson.mail },
      });
      if (!userFromBDD) {
        // result est null ! L'utilisateur n'existe pas dans la BDD
        throw new HttpError("login ou mot de passe incorrect", 401);
      }

      // 3. Vérifier si le mot de passe de l'utilisateur correspond au hash mis dans la BDD
      if (!(await argon2.verify(userFromBDD.password, dataJson.password))) {
        // Le mot de passe ne correspond pas !
        throw new HttpError("login ou mot de passe incorrect", 401);
      }

      // 4. Créer le token avec l'id de l'utilisateur
      // process.env.JWT_SECRET ==> va chercher le secret qui est dans .env
      const token = jwt.sign(
        // Les données à mettre dans le token ==> PAYLOAD (charge utile)
          {
        user_id: userFromBDD.id,
        mail: userFromBDD.mail,   // utile pour afficher dans le front
        role: userFromBDD.role,   // indispensable pour le back-office
      },
        // Le secret pour calculer le token
        process.env.JWT_SECRET, // Le secret que j'ai découvert de l'API
        // Date d'expiration du token : le token expire dans une heure !
        {
          expiresIn: "1h",
        },
      );

      // 5. Réponse à la requete du client : 200 + le token
      res.status(200).json({ token });
    } catch (error) {
      next(error);
    }
  },

  async getMyAccount(req, res, next) {
    try {
      const userId = req.user.id;

      const user = await User.findByPk(userId, {
        attributes: { exclude: ["password"] }, // pour la sécurité
        include: {
          model: Reservation,
          as: "reservations", // ton alias Sequelize
          include: {
            model: Ticket,
            as: "ticket", // alias pour la relation Reservation → Ticket
            attributes: ["name", "price"],
          },
        },
      });

      if (!user) {
        return res.status(404).json({ message: "Utilisateur introuvable" });
      }

      res.json(user); // ✅ renvoie user + reservations + tickets
    } catch (err) {
      next(err);
    }
  },
};

export default authController;
