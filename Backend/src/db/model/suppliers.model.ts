import { DataTypes, Model } from "sequelize";
import sequelize from "../../config/app";

export class suppliers extends Model {
  public id!: number;
  public name!: string;
  public contactName!: string;
  public contactEmail!: string;
  public contactPhone!: string;
  public password!: string;
  public addressId!: number;
}

suppliers.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    contactName: {
      type: DataTypes.STRING(500),
      allowNull: false,
    },
    contactEmail: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    contactPhone: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    addressId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: "suppliers",
  }
);

export default suppliers;
