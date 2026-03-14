import Joi from "joi";
import HttpError from "../utils/HttpError.js";
import jwt from "jsonwebtoken";
import { User } from "../models/index.js";

export function validateUser(req, res, next) {
  // Schema du JSON attendu
  const userSchema = Joi.object({
    first_name: Joi.string().min(3).max(30).required().messages({
      "string.empty": "Le prénom est obligatoire",
      "string.min": "Le prénom doit contenir au moins 3 caractères",
      "string.max": "Le prénom ne peut pas dépasser 30 caractères",
      "any.required": "Le prénom est obligatoire",
    }),

    last_name: Joi.string().min(3).max(30).required().messages({
      "string.empty": "Le nom est obligatoire",
      "string.min": "Le nom doit contenir au moins 3 caractères",
      "string.max": "Le nom ne peut pas dépasser 30 caractères",
      "any.required": "Le nom est obligatoire",
    }),

    mail: Joi.string().email().required().messages({
      "string.empty": "L'email est obligatoire",
      "string.email": "L'email n'est pas valide",
      "any.required": "L'email est obligatoire",
    }),

    password: Joi.string().min(12).max(100).required().messages({
      "string.empty": "Le mot de passe est obligatoire",
      "string.min": "Le mot de passe doit contenir au moins 12 caractères",
      "string.max": "Le mot de passe ne peut pas dépasser 100 caractères",
      "any.required": "Le mot de passe est obligatoire",
    }),

    phone_number: Joi.string()
      .pattern(/^[0-9]{10}$/)
      .required()
      .messages({
        "string.empty": "Le numéro de téléphone est obligatoire",
        "string.pattern.base":
          "Le numéro de téléphone doit contenir 10 chiffres",
        "any.required": "Le numéro de téléphone est obligatoire",
      }),

    city: Joi.string().min(2).max(50).allow("").messages({
      "string.empty": "La ville est obligatoire",
      "string.min": "La ville doit contenir au moins 2 caractères",
      "string.max": "La ville ne peut pas dépasser 50 caractères",
      "any.required": "La ville est obligatoire",
    }),

    address: Joi.string().min(3).max(255).allow("").messages({
      "string.min": "L'adresse doit contenir au moins 3 caractères",
      "string.max": "L'adresse est trop longue",
    }),

    postcode: Joi.string().min(3).max(10).allow("").messages({
      "string.min": "Le code postal doit contenir au moins 3 caractères",
      "string.max": "Le code postal ne peut pas dépasser 10 caractères",
    }),
  });
  const { error, value } = userSchema.validate(req.body, {
    abortEarly: false,
  });

  if (error) {
    return res.status(400).json({
      message: error.details.map((err) => err.message),
    });
  }

  // Je ne suis pas rentré dans le IF, le body est valide donc j'appel le middleware suivant
  next();
}

export function validateLogin(req, res, next) {
  // Schema du JSON attendu
  const userSchema = Joi.object({
    mail: Joi.string().email().required(),
    password: Joi.string().min(6).max(30).required(),
  });

  const validation = userSchema.validate(req.body);

  if (validation.error) {
    // ERROR le JSON de la request n'est pas valide !
    // Erreur => lance une nouvelle erreur, elle sera attrapée par le middleware de gestion des erreurs
    // Equivalent de : return next(new HttpError(validation.error, 400));
    throw new HttpError("un des champs n'est pas correctement rempli", 400);
  }

  // Je ne suis pas rentré dans le IF, le body est valide donc j'appel le middleware suivant
  next();
}

export function validateToken(req, res, next) {
  // 1. chercher le token qui est dans l'entête HTTP de la requete
  // entete sous forme de clé / valeur ==> Authorization: "Bearer < token >"
  // Valeur attendue : "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxLCJpYXQiOjE3NjU5NjEzNzcsImV4cCI6MTc2NTk2NDk3N30.t9_Iare4Fh7CG59hpjHtSesnbAG1HzEFErAI5hNtdVo"
  const bearerToken = req.headers.authorization;

  // 2. Est-ce que bearerToken existe et commence par "Bearer "
  if (!bearerToken || !bearerToken.startsWith("Bearer ")) {
    // Pas de authorization OU pas de bearer ==> lance une erreur 401 unauthorized qui sera attrapée par le errorHandler
    throw new HttpError("Authorization token missing or invalid", 401);
  }

  // 3. extraire le token de chaine de caractère
  // split découpe une string selon un séparateur et retourne un tableau de sous string
  // ici ça crée un tableau avec deux cases [Bearer] [eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxLCJpYXQiOjE3NjU5NjEzNzcsImV4cCI6MTc2NTk2NDk3N30.t9_Iare4Fh7CG59hpjHtSesnbAG1HzEFErAI5hNtdVo]
  // index 0 du tableau : "Bearer"
  // index 1 du tableau : le token
  const token = bearerToken.split(" ")[1];

  // 4. Utiliser JWT pour vérifier le token. Doc : https://www.npmjs.com/package/jsonwebtoken
  jwt.verify(token, process.env.JWT_SECRET, function (err, decoded) {
    // Token invalide => il a été modifié par le client ou il est expiré, etc.
    if (err) {
      console.log(err);
      throw new HttpError("Authorization token missing or invalid", 401);
    }

    // req.user permet de stocker l'id, le mail et le role
    req.user = {
      id: decoded.user_id,
      mail: decoded.mail,
      role: decoded.role,
    };
    // 5. passe au middleware suivante
    next();
  });
}
