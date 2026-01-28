import { Activity, Category } from "../models/index.js";

export const getAllPersonnages = async (req, res) => {
    const personnages = await Activity.findAll({
      include: {
        model: Category,
        as: "category",
      },
      where: { category_id: 3 }
    });

  res.json(personnages);
};

export const getById = async (req, res) => {
  const { id } = req.params;

  try {
    const personnage = await Activity.findByPk(id, {
      include: {
        model: Category,
        as: "category"
      }
    });

    if (!personnage) {
      return res.status(404).json({ message: "Personnage introuvable" });
    }

    res.json(personnage);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur serveur" });
  }
};