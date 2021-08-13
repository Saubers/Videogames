const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define("videogame", {
    id: { type: DataTypes.UUID, allowNull: false, primaryKey: true, defaultValue: DataTypes.UUIDV4 },
    name: { type: DataTypes.STRING, allowNull: false, defaultValue: true },
    img: { type: DataTypes.STRING },
    description: { type: DataTypes.STRING, allowNull: false, defaultValue: true },
    releaseDate: { type: DataTypes.DATE },
    rating: { type: DataTypes.STRING },
    platform: { type: DataTypes.STRING, allowNull: false, defaultValue: true },
    createdInDB: {type: DataTypes.BOOLEAN, defaultValue: true}
  });
};
