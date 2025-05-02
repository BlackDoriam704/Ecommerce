import { DataTypes, Model } from 'sequelize';
import sequelize from '../../config/app';

export class AuditLog extends Model {
  public id!: number;
  public action!: string;
  public userId!: number | null; // Puede ser null si la acción no está asociada a un usuario
  public details!: string;
  public createdAt!: Date;
}

AuditLog.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    action: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: true, // Puede ser null si no hay un usuario asociado
    },
    details: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    tableName: 'audit_logs',
    timestamps: false, // Usamos createdAt manualmente
  }
);

export default AuditLog;