import express from 'express';
import cors from 'cors';
import path from 'path';
import dotenv from 'dotenv'; // Importa dotenv

dotenv.config(); // Carga las variables de entorno desde el archivo .env

import userRoutes from '../../Backend/src/routes/router'; // Asegúrate de que la ruta sea correcta

class Serve {
  private app: express.Application;
  private port: string;

  constructor() {
    console.log(process.env.PORT); // Verifica si la variable PORT se carga correctamente
    this.app = express();
    this.port = process.env.PORT || '8100';
    this.middlewares();
    this.routes();
    this.listen();
  }

  middlewares() {
    // Configuración CORS simplificada
    this.app.use(cors({
      // origin: 'http://localhost:3001', // Asegúrate de permitir el origen del frontend
      origin:'https://shiny-space-journey-5g47xrgpjr9927j5v-3001.app.github.dev',
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
      allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'Authorization']
    }));
    this.app.use(express.json());
    // Middleware para servir archivos estáticos
    this.app.use('/uploads', express.static(path.join(__dirname, '../../uploads')));
  }

  routes() {
    this.app.use('/', userRoutes);
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`Server started on port ${this.port}`);
    });
  }
}

export default Serve;