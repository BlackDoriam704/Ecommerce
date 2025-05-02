import { DataTypes, Model } from 'sequelize';
import sequelize from '../../config/app';

export class Product extends Model {
  public id!: number;
  public name!: string;
  public description!: string;
  public categoryId!: number;
  public price!: number;
  public stock!: number;
  public images!: string[]; // Almacena las rutas de las imágenes
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
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    stock: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      validate: {
        min: 1, // Entero positivo
      },
    },
    images: {
      type: DataTypes.JSON, // Almacena un array de rutas de imágenes
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'products',
  }
);

export default Product;