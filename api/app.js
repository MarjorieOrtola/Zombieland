import express from "express";
import cors from 'cors';
const app = express();


app.use(express.json()); // 🔥 INDISPENSABLE

app.use(cors());
app.use(express.urlencoded({ extended: true }));

import attractionRouter from './routes/attraction.router.js';
import spectacleRouter from './routes/spectacle.router.js';
import personnageRouter from './routes/personnage.router.js';
import authRouter from './routes/auth.router.js';

app.get('/', (req,res) => {
    res.send("hello")
});

app.use(attractionRouter);
app.use(spectacleRouter);
app.use(personnageRouter);
app.use(authRouter);
app.use((err, req, res, next) => {
  console.error(err);
  const status = err.statusCode || 500;
  const message = err.message || "Erreur serveur";
  res.status(status).json({ message });
});

app.listen(3000, () => {
    console.log("Serveur lancer sur le port 3000")
});