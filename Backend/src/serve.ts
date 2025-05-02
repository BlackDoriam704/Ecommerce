import express from 'express';
import cors from 'cors';
import path from 'path';
import userRoutes from '../../Backend/src/routes/router'; // Asegúrate de que la ruta sea correcta

class Serve {
  private app: express.Application;
  private port: string;

  constructor() {
    this.app = express();
    this.port = process.env.PORT || '8101';
    this.middlewares();
    this.routes();
    this.listen();
  }

  middlewares() {
    this.app.use(express.json());

    // Configuración CORS simplificada
    this.app.use(cors({
      origin: 'http://localhost:3001', // Asegúrate de permitir el origen del frontend
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
      allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'Authorization']
    }));

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