import { Activity, Category } from "../models/index.js";

export const getAllSpectacles = async (req, res) => {
    const spectacles = await Activity.findAll({
      include: {
        model: Category,
        as: "category",
      },
      where: { category_id: 2 }
    });

  res.json(spectacles);
};

export const getById = async (req, res) => {
  const { id } = req.params;

  try {
    const spectacle = await Activity.findByPk(id, {
      include: {
        model: Category,
        as: "category"
      }
    });

    if (!spectacle) {
      return res.status(404).json({ message: "Spectacle introuvable" });
    }

    res.json(spectacle);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur serveur" });
  }
};
