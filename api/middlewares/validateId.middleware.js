

// Proège des injection SQL

export const validateId = (req, res, next) => {

  const id = Number(req.params.id);

  if (!Number.isInteger(id) || id <= 0) {
    throw new HttpError("Id Invalide", 400);
  }

  next();
};
