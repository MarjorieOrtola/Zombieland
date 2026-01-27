import { Activity, Category } from "../models/index.js";

export const getActivityDetail = async (req, res) => {
  const { id } = req.params;

  const activity = await Activity.findByPk(id, {
    include: Category,
  });

  if (!activity) {
    return res.status(404).json({ message: "Activité introuvable" });
  }

  res.json(activity);
};