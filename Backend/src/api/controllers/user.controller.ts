import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { createUser, findUserByEmail, comparePassword } from '../../services/user.service';
import { logAuditEvent } from '../../services/audit.service';

const JWT_SECRET = process.env.JWT_SECRET || 'supersecret';

/**
 * Registro de usuario
 */
export const register = async (req: Request, res: Response): Promise<void> => {
  const { username, email, password, roleId } = req.body;
  try {
    const existingUser = await findUserByEmail(email);
    if (existingUser) {
      res.status(400).json({ message: 'Email already in use' });
      return;
    }
    const roleName = 1; // Rol predeterminado (e.g., 1 for 'user')
    const user = await createUser(username, email, password, roleId || roleName);

    // Registrar el evento de auditoría
    await logAuditEvent('REGISTER_USER', user.id, `User ${username} registered with email ${email}`);

    res.status(201).json({ message: 'User created', user: { id: user.id, email: user.email } });
  } catch (error) {
    res.status(500).json({ message: 'Error registering user', error: error instanceof Error ? error.message : 'Unknown error' });
  }
};

/**
 * Inicio de sesión
 */
export const login = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;
  try {
    const user = await findUserByEmail(email);
    if (!user) {
      res.status(400).json({ message: 'Invalid credentials' });
      return;
    }

    const isMatch = await comparePassword(password, user.password);
    if (!isMatch) {
      res.status(400).json({ message: 'Invalid credentials' });
      return;
    }

    const token = jwt.sign({ userId: user.id, role: user.roleId }, JWT_SECRET, { expiresIn: '1h' });

    // Registrar el evento de auditoría
    await logAuditEvent('LOGIN_USER', user.id, `User ${user.username} logged in`);

    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: 'Error logging in', error: error instanceof Error ? error.message : 'Unknown error' });
  }
};