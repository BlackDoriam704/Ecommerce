import { DataTypes, Model } from 'sequelize';
import sequelize from '../../config/app';

export class Role extends Model {
    public id!: number;
    public name!: string;
}

Role.init(
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
    },
    {
        sequelize,
        tableName: 'roles',
    }
);
