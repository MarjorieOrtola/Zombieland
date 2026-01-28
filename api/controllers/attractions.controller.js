import { Activity, Category } from "../models/index.js";

export const getAllAttractions = async (req, res) => {
    const attractions = await Activity.findAll({
      include: {
        model: Category,
        as: "category",
      },
      where: { category_id: 1 }
    });

  res.json(attractions);
};

export const getById = async (req, res) => {
  const { id } = req.params;

  try {
    const attraction = await Activity.findByPk(id, {
      include: {
        model: Category,
        as: "category"
      }
    });

    if (!attraction) {
      return res.status(404).json({ message: "Attraction introuvable" });
    }

    res.json(attraction);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur serveur" });
  }
};