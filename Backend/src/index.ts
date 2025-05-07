import Serve from "./serve";
import sequelize from "./config/app";
import dotenv from "dotenv";
import types from "./types/types";

dotenv.config();
// Importa dotenv y carga las variables de entorno
// desde el archivo .env

const server = new Serve();

sequelize.authenticate()
  .then(() => {
    console.log('Connection to the database has been established successfully.');
    return sequelize.sync({ force: false });
  })
  .catch((error) => {
    console.error('Unable to connect to the database:', error);
  });