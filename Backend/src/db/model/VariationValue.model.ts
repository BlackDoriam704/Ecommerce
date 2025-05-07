import { DataTypes, Model } from 'sequelize';
import sequelize from '../../config/app';
import VariationOption from './VariationOption.model';

export class VariationValue extends Model {
  public id!: number;
  public optionId!: number;
  public value!: string;
  // public hex_code!: string;
}

VariationValue.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    optionId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      references: {
        model: VariationOption,
        key: 'id',
      },
    },
    value: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    // hex_code:{
    //   type: DataTypes.STRING,
    //   allowNull: true,
    // },
  },
  {
    sequelize,
    tableName: 'variation_value',
    timestamps: false, 
  }
);
VariationValue.belongsTo(VariationOption, { foreignKey: 'optionId', as: 'option' });


export default VariationValue;