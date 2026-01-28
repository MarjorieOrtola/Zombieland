import { Activity, Category } from "../models/index.js"; 

export async function getByCategory(req, res) {
  const { category } = req.params;

  const activities = await Activity.findAll({
    include: {
      model: Category,
      as: "category", // 🔥 OBLIGATOIRE
      where: { name: category },
    },
  });

  res.json(activities);
}

export async function getByCategoryAndId(req, res) {
  const { category, id } = req.params;

  const activity = await Activity.findOne({
    where: { id },
    include: {
      model: Category,
      as: "category", // 🔥 OBLIGATOIRE
      where: { name: category },
    },
  });

  if (!activity) {
    return res.status(404).json({ message: "Activité introuvable" });
  }

  res.json(activity);
}
