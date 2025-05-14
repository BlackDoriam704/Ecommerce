import { DataTypes, Model } from "sequelize";
import sequelize from "../../config/app";
import { Role } from "./Role.model";

export class User extends Model {
  public id!: number;
  public username!: string;
  public FirstName!: string;
  public LastName!: string;
  public email!: string;
  public phoneNumber!: string;
  public password!: string;
  public roleId!: number;
  public PrimaryAddressId!: number;
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    FirstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    LastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phoneNumber: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    PrimaryAddressId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    roleId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      references: {
        model: Role,
        key: "id",
      },
    },
  },
  {
    sequelize,
    tableName: "users",
  }
);

User.belongsTo(Role, { foreignKey: "roleId", as: "role" });
Role.hasMany(User, { foreignKey: "roleId", as: "users" });
