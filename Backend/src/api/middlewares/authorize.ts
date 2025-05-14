import { Request, Response, NextFunction } from "express";
import { Role } from "../../db/model/Role.model";
import Permission from "../../db/model/Permission.model";

export const authorize = (requiredPermission: string) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userRoleId = req.User?.roleId; // El rol del usuario debe estar en req.User
      if (!userRoleId) {
        return res
          .status(403)
          .json({ message: "Access denied: No role assigned" });
      }

      // Buscar el rol del usuario y sus permisos
      const role = await Role.findByPk(userRoleId, {
        include: [{ model: Permission, as: "permissions" }], // Asegúrate de que el alias 'permissions' coincida con el definido en las asociaciones
      });

      if (!role) {
        return res
          .status(403)
          .json({ message: "Access denied: Role not found" });
      }

      // Verificar si el rol tiene permisos asociados
      const permissions = role.get("permissions") as Permission[]; // Asegúrate de que Sequelize devuelva los permisos correctamente
      if (!permissions || permissions.length === 0) {
        return res
          .status(403)
          .json({ message: "Access denied: No permissions assigned to role" });
      }

      // Verificar si el rol tiene el permiso requerido
      const hasPermission = permissions.some(
        (perm) => perm.name === requiredPermission
      );
      if (!hasPermission) {
        return res
          .status(403)
          .json({ message: "Access denied: Insufficient permissions" });
      }

      next();
    } catch (error) {
      console.error("Error in authorize middleware:", error); // Log para depuración
      res
        .status(500)
        .json({
          message: "Error verifying permissions",
          error: error instanceof Error ? error.message : "Unknown error",
        });
    }
  };
};
