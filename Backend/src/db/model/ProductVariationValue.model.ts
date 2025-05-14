import { DataTypes, Model } from "sequelize";
import sequelize from "../../config/app";
import ProductVariation from "./ProductVariation.model";
import VariationValue from "./VariationValue.model";

export class ProductVariationValue extends Model {
  public id!: number;
  public productVariationId!: number;
  public variationValueId!: number;
}

ProductVariationValue.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    productVariationId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      references: {
        model: ProductVariation,
        key: "id",
      },
    },
    variationValueId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      references: {
        model: VariationValue,
        key: "id",
      },
    },
  },
  {
    sequelize,
    tableName: "product_variation_value",
    timestamps: false,
  }
);

ProductVariationValue.belongsTo(VariationValue, {
  as: "variationValue",
  foreignKey: "variationValueId",
});

export default ProductVariationValue;
