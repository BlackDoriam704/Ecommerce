import { DataTypes, Model } from "sequelize";
import sequelize from "../../config/app";

export class Product extends Model {
  public id!: number;
  public name!: string;
  public description!: string;
  public categoryId!: number;
  public supplierId!: number;
  public estado!: string;
}

Product.init(
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
    description: {
      type: DataTypes.STRING(500),
      allowNull: false,
    },
    categoryId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    supplierId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "products",
  }
);

export default Product;
