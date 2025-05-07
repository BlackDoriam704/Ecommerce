import { DataTypes, Model } from 'sequelize';
import sequelize from '../../config/app';
import Cart from './Cart.model';
import ProductVariation from './ProductVariation.model';


export class CartItem extends Model {
  public id!: number;
  public cartId!: number;
  public productId!: number;
  public quantity!: number;
  public price!: number;
  public subtotal!: number;
}

CartItem.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    cartId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Cart,
        key: 'id',
      },
    },
    productId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: ProductVariation,
        key: 'id',
      },
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    subtotal: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'cart_item',
  }
);
// CartItem.belongsTo(Cart, { foreignKey: 'cartId' });
CartItem.belongsTo(ProductVariation, { foreignKey: 'productId' });
export default CartItem;