import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import {
  createUser,
  findUserByEmail,
  comparePassword,
} from "../../services/user.service";
import { logAuditEvent } from "../../services/audit.service";
import { User } from "../../db/model/User.model";

const JWT_SECRET = process.env.JWT_SECRET || "supersecret";

/**
 * Registro de usuario
 */
export const register = async (req: Request, res: Response): Promise<void> => {
  const { username, email, password, roleId } = req.body;
  try {
    const existingUser = await findUserByEmail(email);
    if (existingUser) {
      res.status(400).json({ message: "Email already in use" });
      return;
    }
    const roleName = 1; // Rol predeterminado (e.g., 1 for 'user')
    const user = await createUser(
      username,
      email,
      password,
      roleId || roleName
    );

    // Registrar el evento de auditoría
    await logAuditEvent(
      "REGISTER_USER",
      user.id,
      `User ${username} registered with email ${email}`
    );

    res
      .status(201)
      .json({
        message: "User created",
        user: { id: user.id, email: user.email },
      });
  } catch (error) {
    res
      .status(500)
      .json({
        message: "Error registering user",
        error: error instanceof Error ? error.message : "Unknown error",
      });
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
      res.status(400).json({ message: "Invalid credentials" });
      return;
    }

    const isMatch = await comparePassword(password, user.password);
    if (!isMatch) {
      res.status(400).json({ message: "Invalid credentials" });
      return;
    }

    const token = jwt.sign({ userId: user.id, role: user.roleId }, JWT_SECRET, {
      expiresIn: "1h",
    });

    // Registrar el evento de auditoría
    await logAuditEvent(
      "LOGIN_USER",
      user.id,
      `User ${user.username} logged in`
    );

    // Crear la respuesta
    const response = {
      token,
      userId: user.id,
      roleId: user.roleId,
    };

    // Imprimir la respuesta en la consola
    console.log("Respuesta del login:", response);

    // Enviar la respuesta al cliente
    res.json(response);
  } catch (error) {
    res.status(500).json({
      message: "Error logging in",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};
export const getUserProfile = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const userId = req.User?.userId; // `req.user` debe ser configurado por un middleware de autenticación
    if (!userId) {
      res.status(401).json({ message: "No autorizado" });
      return;
    }

    const user = await User.findByPk(userId, {
      attributes: ["id", "username", "email", "roleId"], // Devuelve solo los campos necesarios
    });

    if (!user) {
      res.status(404).json({ message: "Usuario no encontrado" });
      return;
    }

    res.json(user);
  } catch (error) {
    res
      .status(500)
      .json({
        message: "Error al obtener el perfil del usuario",
        error: error instanceof Error ? error.message : "Error desconocido",
      });
  }
};
