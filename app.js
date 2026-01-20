import express from "express";

const app = express();

import attractionRouter from './routes/attraction.router.js';
import spectacleRouter from './routes/spectacle.router.js';
import personnageRouter from './routes/personnage.router.js';

app.get('/', (req,res) => {
    res.send("hello")
});

app.use(attractionRouter);
app.use(spectacleRouter);
app.use(personnageRouter);

app.listen(3000, () => {
    console.log("Serveur lancer sur le port 3000")
});