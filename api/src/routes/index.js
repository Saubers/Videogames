const { Router } = require('express');
const { createVideogame, videogameRoute, getGenres, getByID } = require('../controllers/routesFunctions');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const { Genre, Videogame } = require('../db');
const router = Router();
const { API_KEY } = process.env

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);



router.get('/videogames', videogameRoute)
  
router.get('/videogames/:id', getByID)

router.get('/genres', getGenres)

router.post('/videogames/create', createVideogame )

module.exports = router
