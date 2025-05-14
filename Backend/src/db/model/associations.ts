import { Product } from "./Product.model";
import Permission from "./Permission.model";
import { Role } from "./Role.model";
import RolePermission from "./Role_permissions.model";
import { Model, Association } from "sequelize";
import ProductVariationValue from "./ProductVariationValue.model";

// Asociaciones de Roles y Permisos
Role.belongsToMany(Permission, {
  through: RolePermission,
  foreignKey: "roleId",
  otherKey: "permissionId",
  as: "permissions",
});

Permission.belongsToMany(Role, {
  through: RolePermission,
  foreignKey: "permissionId",
  otherKey: "roleId",
  as: "roles",
});

class ProductVariation extends Model {
  public static associations: {
    variationValues: Association<ProductVariation, ProductVariationValue>;
  };
}
export { Product, ProductVariation, Permission, Role };
