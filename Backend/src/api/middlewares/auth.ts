import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

declare global {
  namespace Express {
    interface Request {
      User?: any;
      sessionID?: string;
    }
  }
}

const JWT_SECRET = process.env.JWT_SECRET || 'supersecret';

export const authenticate = (req: Request, res: Response, next: NextFunction): void => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    res.status(401).json({ message: 'No token provided' });
    return; // Termina el flujo aquí
  }

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { userId: number; role: string };
    req.User = decoded; // Agrega la información del usuario al objeto `req`
    next(); // Continúa con el siguiente middleware o controlador
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
    return; // Termina el flujo aquí
  }
};