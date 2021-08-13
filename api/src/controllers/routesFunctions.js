const { default: axios } = require("axios");
const { Videogame, Genre } = require("../db");
const { getApiInfo, getDBinfo, getAllVideogames } = require("./backFunctions");
const { API_KEY } = process.env;
const { v4: uuidv4 } = require('uuid')

const createVideogame = async (req, res, next) => {
  const {
    name,
    rating,
    platforms,
    description,
    image,
    genres,
    release,
    createdInDb,
  } = req.body;
  try {
    const newGame = await Videogame.create({
      id: uuidv4(),
      name: name,
      description: description,
      image: image,
      rating: rating,
      platforms: platforms,
      release: release,
      createdInDb,
    });
    const genresName = genres?.map(el => el.name)
    await newGame.setGenres(genresName);
    return res.send(newGame);
  } catch (err){{
    console.log('Ocurrio un error al encontrar videogames...')
    next(err)
  }} {
    return error;
  }
};

const videogameRoute = async (req, res) => {
  const name = req.query.name;
  const allGames = await getAllVideogames();
  if (name) {
    const gameName = await allGames.filter((el) =>
      el.name.toLowerCase().includes(name.toLowerCase())
    );
    gameName.length ? 
    res.status(200).send(gameName) : 
    res.status(404).send("No se ha encontrado ese videojuego...");
  } else res.status(200).send(allGames);
};

getByID = async (req, res) => {
    const id = req.params.id;
    let gameApiResults;
    if(id) {
        // DB videogame Detail 
        if(id.length > 9) {
            let gameDb = await this.model.findOne({
                attributes: [ 'image', 'name', 'description', 'released', 'rating', 'platforms'],
                where: {
                    id: id,
                },
                include: [{
                    model: Genre
                }] 
            })
            if(gameDb) {
                res.json({
                    data: gameDb,
                    message: 'Se encontro la Data Base'
                });        
            }
            else {
                res.status(404).json({
                    message: "El id no existe en la Data Baser"
                })
            }
        }
        // Api videogame Detail 
        else {
            let gameApi = await axios.get(`https://api.rawg.io/api/games/${id}?key=${API_KEY}`);
            if( gameApi) {
                gameApiResults = {
                    id: gameApi.data.id,
                    name: gameApi.data.name_original,
                    description: gameApi.data.description,
                    released: gameApi.data.released,
                    image: gameApi.data.background_image,
                    rating: gameApi.data.rating,
                    platforms: gameApi.data.platforms.map(e => e.platform.name),
                    genres: gameApi.data.genres.map(e => e.name), 
                }
                res.json({
                    data: gameApiResults,
                    message: 'Se ha encontrado el Videojuego'
                });        
            }
            else {
                res.status(404).json({
                    message: "No se ha encontrado tal id en la API"
                })
            }               
        }
    } 
};

const getGenres = async (req, res) => {
  const genresApi = await axios.get(
    `https://api.rawg.io/api/genres?key=${API_KEY}`
  );
  const genres = await genresApi.data.results?.map((el) => el.name);
  const accesGenres = await genres?.map((el) => el);
  console.log(accesGenres);
  accesGenres?.forEach((el) => {
    Genre?.findOrCreate({
      where: { name: el },
    });
  });
  const allGenres = await Genre.findAll();
  res.send(allGenres);
};

module.exports = {
  createVideogame,
  videogameRoute,
  getGenres,
  getByID,
};
