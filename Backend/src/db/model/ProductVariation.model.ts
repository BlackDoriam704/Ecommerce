import { DataTypes, Model, Association, HasManyGetAssociationsMixin } from 'sequelize';
import sequelize from '../../config/app';
import { Product } from './Product.model';
import ProductVariationValue from './ProductVariationValue.model';

export class ProductVariation extends Model {
  public id!: number;
  public productId!: number;
  public name!: string;
  public price!: number;
  public stock!: number;
  public imageUrl!: string;

  // Relación con ProductVariationValue
  public variationValues?: ProductVariationValue[];

  // Métodos de Sequelize para relaciones
  public getVariationValues!: HasManyGetAssociationsMixin<ProductVariationValue>;

  public static associations: {
    variationValues: Association<ProductVariation, ProductVariationValue>;
  };
}

ProductVariation.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    productId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      references: {
        model: Product,
        key: 'id',
      },
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    imageUrl: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'product_variation',
    timestamps: false, 
  }
);

// Relación con ProductVariationValue
ProductVariation.hasMany(ProductVariationValue, {
  as: 'variationValues',
  foreignKey: 'productVariationId',
});
ProductVariationValue.belongsTo(ProductVariation, {
  as: 'productVariation',
  foreignKey: 'productVariationId',
});

// Relación con Product
ProductVariation.belongsTo(Product, {
  foreignKey: 'productId',
  as: 'product',
});

export default ProductVariation;