import { DataTypes, Model } from "sequelize";
import sequelize from "../../config/app";

export class VariationOption extends Model {
  public id!: number;
  public name!: string;
}

VariationOption.init(
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
  },
  {
    sequelize,
    tableName: "variation_option",
    timestamps: false,
  }
);

export default VariationOption;
