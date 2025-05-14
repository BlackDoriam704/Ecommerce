import { DataTypes, Model } from "sequelize";
import sequelize from "../../config/app";

class Permission extends Model {
  public id!: number;
  public name!: string;
}

Permission.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true, // Cada permiso debe ser único
    },
  },
  {
    sequelize,
    tableName: "permissions", // Nombre de la tabla en la base de datos
    timestamps: false, // Si no tienes columnas createdAt y updatedAt
  }
);

export default Permission;
