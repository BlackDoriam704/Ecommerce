import bcrypt from "bcryptjs";
import UserRepository from "../db/repositories/user.repository";
import { Role } from "../db/model/Role.model";
import { logAuditEvent } from "./audit.service";

/**
 * Crear un nuevo usuario
 */
export const createUser = async (
  username: string,
  email: string,
  password: string,
  roleId: number
) => {
  console.log(`Buscando rol con ID: ${roleId}`); // Log para depuración
  const role = await Role.findByPk(roleId); // Buscar el rol por su ID
  if (!role) throw new Error(`Role with ID '${roleId}' not found`);

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await UserRepository.create({
    username,
    email,
    password: hashedPassword,
    roleId: role.id, // Asociar el ID del rol al usuario
  });

  // Registrar el evento de auditoría
  await logAuditEvent(
    "CREATE_USER",
    null,
    `User ${username} created with email ${email}`
  );

  return user;
};

/**
 * Buscar usuario por email
 */
export const findUserByEmail = async (email: string) => {
  return await UserRepository.findByEmail(email);
};

/**
 * Comparar contraseñas
 */
export const comparePassword = async (
  inputPassword: string,
  userPassword: string
) => {
  return await bcrypt.compare(inputPassword, userPassword);
};
