const axios = require('axios');
const { Genre } = require('../db');
const { Videogame } = require('../db');
const { API_KEY } = process.env

async function getApiInfo(){
    const apiUrl = await axios(`https://api.rawg.io/api/games?key=${API_KEY}`)
    const apiInfo = await apiUrl.data.results?.map(el => {
        return { 
            name: el.name,
            released: el.released,
            img: el.platforms.map(el => el.platform.image_background),
            ratings: el.ratings.map(el => el.title),
            genre: el.genres.map(el => el.name),
            platform: el.platforms.map(el => el.platform.name)
        };
    });
    return apiInfo;
};

const getDBinfo = async () => {
    return await Videogame.findAll({
        include:{
            model: Genre,
            attributes: ['name'],
            through: {
                attributes: [],
            }
        }
    })
}

const getAllVideogames = async () => {
    const dbInfo = await getDBinfo()
    const apiInfo = await getApiInfo()
    const allInfo = apiInfo?.concat(dbInfo)
    return allInfo;
}

module.exports ={ 
    getApiInfo,
    getDBinfo,
    getAllVideogames
}