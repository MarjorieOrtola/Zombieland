import Joi from 'joi';
// import jwt from 'jsonwebtoken';
import 'dotenv/config';
import HttpError from '../utils/HttpError.js';
import { User } from '../models/index.js';

function validateUser(req, res, next) {

	// Schema du JSON attendu
	const userSchema = Joi.object({
		first_name: Joi.string().min(3).max(30).required(),
		last_name: Joi.string().min(3).max(30).required(),
		mail: Joi.string().email().required(),
		address: Joi.string().min(3).max(255).required(),
		password: Joi.string().min(6).max(30).required(),
		city: Joi.string().min(2).max(50).required(),
		postcode: Joi.string().min(3).max(10).required(),
		phone_number: Joi.string().min(10).max(20).required()
	});

	const validation = userSchema.validate(req.body)

	if (validation.error) {
		// ERROR le JSON de la request n'est pas valide !
		// Erreur => lance une nouvelle erreur, elle sera attrapée par le middleware de gestion des erreurs
		// Equivalent de : return next(new HttpError(validation.error, 400));
		throw new HttpError("login ou mot de passe invalides", 400);
	}

	// Je ne suis pas rentré dans le IF, le body est valide donc j'appel le middleware suivant
	next();
}

export default validateUser;
