import { Request, Response, NextFunction } from 'express';

declare global {
    namespace Express {
        interface Request {
            User?: any;
        }
    }
}
import jwt from 'jsonwebtoken';
import { User } from '../../db/model/User.model';

const JWT_SECRET = process.env.JWT_SECRET || 'supersecret';

export const authenticate = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).json({ message: 'No token provided' });

    const token = authHeader.split(' ')[1];
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.User = decoded;
        next();
    } catch (error) {
        res.status(401).json({ message: 'Invalid token' });
    }
};
