import 'express';

declare module 'express' {
  export interface Request {
    sessionID?: string; // Agregar la propiedad sessionID
  }
}