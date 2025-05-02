import { Sequelize } from 'sequelize';

// const sequelize = new Sequelize('ecommerse', 'root', '', {
//   host: 'localhost',
//   dialect: 'mysql', // o el dialecto que estés usando
// });


const sequelize = new Sequelize('Tienda', 'cristian', 'Dios2002', {
  host: 'server-001s.database.windows.net', // Aquí pones el nombre de tu servidor de Azure SQL
  dialect: 'mssql',
  dialectOptions: {
    encrypt: true,                    // Es necesario para las conexiones en Azure SQL Server
    trustServerCertificate: false,    // No confiar en el certificado en entornos de producción, poner true solo en desarrollo local
  },
  logging: false,                      // Desactiva el registro de las consultas SQL, si no deseas verlas
  port: 1433,                          // El puerto por defecto para SQL Server (puede ser necesario si el servidor no usa el puerto por defecto)
});
export default sequelize; 