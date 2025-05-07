import { DataTypes, Model } from 'sequelize';
import sequelize from '../../config/app';
import CartItem from './CartItem.model';

export class Cart extends Model {
  public id!: number;
  public userId!: number | null; // Puede ser null para usuarios no autenticados
  public sessionId!: string | null; // Identificador de sesión para usuarios anónimos
  public status!: string; // Estado del carrito (ej. 'active', 'completed')
  public total!: number;
  public subtotal!: number;
  public discountTotal!: number;
  public shippingCost!: number;
  public taxTotal!: number;
  public currency!: string;
  public shippingMethodId!: number | null;
  public discountCodeId!: number | null;
}

Cart.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    sessionId: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'active',
    },
    total: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      defaultValue: 0,
    },
    subtotal: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      defaultValue: 0,
    },
    discountTotal: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      defaultValue: 0,
    },
    shippingCost: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      defaultValue: 0,
    },
    taxTotal: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      defaultValue: 0,
    },
    // currency: {
    //   type: DataTypes.STRING(10),
    //   allowNull: false,
    //   defaultValue: 'USD',
    // },
    // shippingMethodId: {
    //   type: DataTypes.INTEGER,
    //   allowNull: true,
    // },
    discountCodeId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: 'cart',
  }
);

Cart.hasMany(CartItem, {
  foreignKey: 'cartId',
  as: 'items',
});

export default Cart;
