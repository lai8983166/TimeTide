import { Sequelize, Model, DataTypes } from 'sequelize';
import sequelize from '../config/db';

// 主表，用于存储日期
class DateLog extends Model {
  public id!: number;
  public date!: Date;
  public createdAt!: Date;
}

DateLog.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
      unique: true,
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    modelName: 'DateLog',
    tableName: 'dates',
    timestamps: false,
  }
);

export default DateLog;
