import { DataTypes, Model } from "sequelize";
import sequelize from "../../config/app";

export class RolePermission extends Model {
  public roleId!: number;
  public permissionId!: number;
}

RolePermission.init(
  {
    roleId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      references: {
        model: "roles",
        key: "id",
      },
    },
    permissionId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      references: {
        model: "permissions",
        key: "id",
      },
    },
  },
  {
    sequelize,
    tableName: "role_permissions",
    timestamps: false,
  }
);

export default RolePermission;
