import { DataTypes, Model } from "sequelize";
import sequelize from "../../config/app";

export class DiscountCode extends Model {
  public id!: number;
  public code!: string;
  public discountType!: string; // 'percentage' o 'fixed'
  public discountValue!: number;
  public validFrom!: Date | null;
  public validUntil!: Date | null;
  public isActive!: boolean;
  public createdAt!: Date;
  public updatedAt!: Date;
}

DiscountCode.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    code: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true, // Asegura que el código sea único
    },
    discountType: {
      type: DataTypes.STRING(20),
      allowNull: false,
      validate: {
        isIn: [["percentage", "fixed"]], // Validación para asegurar que el tipo sea 'percentage' o 'fixed'
      },
    },
    discountValue: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    validFrom: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    validUntil: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    tableName: "discount_code",
  }
);

export default DiscountCode;
