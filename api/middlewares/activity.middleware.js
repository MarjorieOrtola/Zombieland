import Joi from "joi";
import HttpError from "../utils/HttpError.js";

// vérifie la conformité des données reçues par le front.
export const validateCreateActivity = (req, res, next) => {

  const createActivitySchema = Joi.object({
    name: Joi.string().min(2).max(100).required(),
    fear_level: Joi.number().integer().min(1).max(5).required(),
    category_id: Joi.number().positive().required(),
    image: Joi.string().min(1).required()
  });

  const validation = createActivitySchema.validate(req.body);

  if (validation.error) {
    throw new HttpError(validation.error, 400);
  }

  next();
};



// vérifie la conformité des données reçues par le front.
export const validateUpdateActivity = (req, res, next) => {

  const updateActivitySchema = Joi.object({
    name: Joi.string().min(2).max(100),
    fear_level: Joi.number().integer().min(1).max(5),
    category_id: Joi.number().positive(),
    image: Joi.string().min(1)
  }).min(1); // au moins un champ

  const validation = updateActivitySchema.validate(req.body);

  if (validation.error) {
    throw new HttpError(validation.error, 400);
  }

  next();
};

