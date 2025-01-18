import { Sequelize, DataTypes } from 'sequelize';
import DateLog from './DateLog';  // 引入主表模型
import sequelize from '../config/db';

// 动态创建表并插入数据
async function createScheduleForDate(date: string, event: string) {
    // 根据日期生成动态表名
    const tableName = `schedule_${date.replace(/-/g, '_')}`;
  
    // 检查主表（dates）中是否已经有该日期记录
    const existingDate = await DateLog.findOne({
      where: { date },
    });
  
    if (!existingDate) {
      // 如果没有该日期记录，则创建新的记录
      await DateLog.create({ date });
      console.log(`Added ${date} to the dates table.`);
    }

 // 动态定义模型，避免直接写原生 SQL
 const Schedule = sequelize.define(tableName, {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    event: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  }, {
    tableName,  // 动态设置表名
    timestamps: false,
  });
  
  // 同步创建表
  await Schedule.sync({ alter: true });
  console.log(`Table ${tableName} created or already exists.`);

  // 插入日程数据
  await Schedule.create({ event });
  console.log(`Event '${event}' added to ${tableName}.`);
}