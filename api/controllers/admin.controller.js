import { User, Activity, Reservation, Category} from "../models/index.js";

// USERS
export const getAllUsers = async (req, res) => {
  const users = await User.findAll({ attributes: ["id","first_name","last_name","mail","role", "address", "postcode", "city", "phone_number"] });
  res.json(users);
};

export const deleteUser = async (req, res) => {
  await User.destroy({ where: { id: req.params.id } });
  res.json({ message: "Utilisateur supprimé" });
};

// ACTIVITIES
export const getAllActivities = async (req, res) => {
  const activities = await Activity.findAll({ include: "category" });
  res.json(activities);
};

export const createActivity = async (req, res, next) => {
  try {
    // Création de l'activité
    const activity = await Activity.create(req.body);

    // Rechargement avec la catégorie
    await activity.reload({
      include: [
        {
          model: Category,
          as: "category"
        }
      ]
    });

    // Réponse
    res.status(201).json(activity);

  } catch (error) {
    next(error);
  }
};


export const updateActivity = async (req, res, next) => {
  try {
    const { id } = req.params;

    // Recherche de l'activité existante
    const activity = await Activity.findByPk(id, {
      include: [
        {
          model: Category,
          as: "category"
        }
      ]
    });

    if (!activity) {
      throw new HttpError(`Activity ${id} Not Found`, 404);
    }

    // Mise à jour des champs
    await activity.update(req.body);

    // Reload pour être sûr d’avoir les relations à jour
    await activity.reload({
      include: [
        {
          model: Category,
          as: "category"
        }
      ]
    });

    // Réponse
    res.status(200).json(activity);

  } catch (error) {
    next(error);
  }
};


export const deleteActivity = async (req, res) => {
  await Activity.destroy({ where: { id: req.params.id } });
  res.json({ message: "Activité supprimée" });
};

// RESERVATIONS
export const getAllReservations = async (req, res) => {
  const reservations = await Reservation.findAll({
    include: ["user","ticket"],
  });
  res.json(reservations);
};

export const deleteReservation = async (req, res) => {
  await Reservation.destroy({ where: { id: req.params.id } });
  res.json({ message: "Réservation supprimée" });
};
