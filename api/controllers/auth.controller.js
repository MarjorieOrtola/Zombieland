import { User } from '../models/index.js';
import HttpError from '../utils/HttpError.js';
import argon2 from 'argon2';
// import jwt from 'jsonwebtoken';

// import dotenv pour lire le fichier .env
import 'dotenv/config';

const authController = {

async registerUser(req, res, next){

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
            where: { mail: dataJson.mail }
        })
        if (result) {
            // result n'est pas null ! J'ai déjà un utilisateur avec cette adresse dans la BDD
            throw new HttpError('Username already exists', 409);
        }
        
        // 3. Calculer le hash du mot de passe
        const hash = await argon2.hash(dataJson.password);

        // 4. Enregistrer le nouvel utilisateur dans la BDD avec le hash du mdp
        const newUser = await User.create({
            first_name: dataJson.first_name,
            last_name: dataJson.last_name,
            password: hash,
            mail: dataJson.mail,
            role: 'user',
            address: dataJson.address,
            city: dataJson.city,
            postcode: dataJson.postcode,
            phone_number:dataJson.phone_number 
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
            id: newUser.id
        });
    
        } catch (error) {
        next(error);
        }}};

export default authController;