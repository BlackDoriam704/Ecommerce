import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
// const sequelize = new Sequelize('ecommerse', 'root', '', {
//   host: 'localhost',
//   dialect: 'mysql', // o el dialecto que estés usando
// });
dotenv.config();


const sequelize = new Sequelize(
  process.env.DB_NAME as string,
  process.env.DB_USER as string,
  process.env.DB_PASSWORD as string,
  {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT as 'mssql', // Asegúrate de que el dialecto sea correcto
    port: parseInt(process.env.DB_PORT || '1433', 10),
    dialectOptions: {
      encrypt: process.env.DB_ENCRYPT === 'true', // Convertir a booleano
      trustServerCertificate: process.env.DB_TRUST_SERVER_CERTIFICATE === 'true', // Convertir a booleano
    },
    logging: false, // Desactiva el registro de las consultas SQL
  }
);

export default sequelize;  
