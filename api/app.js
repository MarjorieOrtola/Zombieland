// Load environnment variables from .env
import 'dotenv/config';
// Import NPM modules
import express from "express";


// Import le middlewre qui vérifie les tokens
import { validateToken } from './middlewares/auth.middleware.js';

// Import local modules
import attractionRouter from './routes/attraction.router.js';
import spectacleRouter from './routes/spectacle.router.js';
import personnageRouter from './routes/personnage.router.js';
import authRouter from './routes/auth.router.js';
import reservationRouter from './routes/reservation.router.js';


// import cors  
import cors from 'cors';
// import xss sanitizer
import { xss } from 'express-xss-sanitizer';

// Create Express app
const app = express();
// middleware cors
// Accepte de partager les données avec localhost:5173
app.use(cors({origin: "http://localhost:5173"}));
app.use(express.urlencoded({ extended: true }));

// Indique à express qu'on utiliser du JSON dans le body des requetes et des reponses HTTP
app.use(express.json()); // 🔥 INDISPENSABLE

// Après app.use JSON
// Protection contre les failles XSS
app.use(xss());

// Router inscription + authentification
app.use(authRouter);
app.use(attractionRouter);
app.use(spectacleRouter);
app.use(personnageRouter);
app.use(reservationRouter);
// Après le router des authentification
// Ajoute le validateToken
// Toutes les routes qui sont ajoutée après cette instruction sont protégée par un token
// cad, les clients doivent être connecté pour accéder aux routes déclarées après
app.use(validateToken);

//Route test
app.get('/', (req, res) => {
    res.send("Hello World");
});

app.use((err, req, res, next) => {
  console.error(err);
  const status = err.statusCode || 500;
  const message = err.message || "Erreur serveur";
  res.status(status).json({ message });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
console.log(`🚀 API started at http://localhost:${PORT}`);
});