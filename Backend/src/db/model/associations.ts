import { Role } from './Role.model';
import Permission from './Permission.model';
import RolePermission from './role_permissions.model';

// Relación muchos a muchos entre Role y Permission
Role.belongsToMany(Permission, {
  through: RolePermission, // Usar el modelo explícito
  foreignKey: 'roleId',
  otherKey: 'permissionId',
  as: 'permissions',
});

Permission.belongsToMany(Role, {
  through: RolePermission, // Usar el modelo explícito
  foreignKey: 'permissionId',
  otherKey: 'roleId',
  as: 'roles',
});