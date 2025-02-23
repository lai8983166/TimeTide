import { Model, Sequelize, DataTypes } from "sequelize";
import DateLog from "./DateLog"; // 引入主表模型
import sequelize from "../config/db";

// 定义模型的数据类型
export interface ScheduleAttributes {
  id?: number; //通常是自增的
  content: string;
  category: string;
  timeMode: string;
  startTime: Date;
  endTime: Date;
  probableTime: number;
  isAware: boolean;
  createdAt?: Date; //通常是自动生成的
}

// 定义模型的实例类型
export interface ScheduleInstance
  extends Model<ScheduleAttributes>,
    ScheduleAttributes {}

// 动态创建模型的函数
export async function createDynamicModel(tableName: string) {
  return sequelize.define<ScheduleInstance>(
    tableName,
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      content: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      category: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      timeMode: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      startTime: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      endTime: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      probableTime: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      isAware: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      tableName,
      timestamps: false, // 如果不需要自动添加时间戳字段
    }
  );
}

//根据日期创建表
export const createTableByDate = async (date: Date) => {
  // 根据日期生成动态表名
  const tableName = `schedule_${date
    .toISOString()
    .split("T")[0]
    .replace(/-/g, "_")}`;

  // 检查主表（dates）中是否已经有该日期记录
  const existingDate = await DateLog.findOne({
    where: { date },
  });

  if (!existingDate) {
    // 如果没有该日期记录，则创建新的记录
    await DateLog.create({ date });
    console.log(`Added ${date} to the dates table.`);
  }

  //创建动态模型
  const Schedule = await createDynamicModel(tableName);

  // 同步创建表
  const table = await Schedule.sync({ alter: true });
  console.log(`Table ${tableName} created or already exists.`);
  return table;
};

//根据表名（日期）获取表中数据
export const getTableData = async (date: Date) => {
  // 根据日期生成动态表名
  const tableName = `schedule_${date
    .toISOString()
    .split("T")[0]
    .replace(/-/g, "_")}`;
  //创建动态模型
  const Schedule = await createDynamicModel(tableName);

  // 同步表结构，alter: true 确保表结构与模型一致
  await Schedule.sync({ alter: true });

  const schedules = await Schedule.findAll();

  //查询数据
  /*schedules.forEach((schedule) => {
    schedulesArray.push(schedule);
  });*/

  // 转换为 ScheduleAttributes[] 类型
  const schedulesData: ScheduleAttributes[] = schedules.map((schedule) =>
    schedule.get({ plain: true })
  );
  return schedulesData;
};

//向某个表（日期）中插入数据
export const insertData = async (date: Date, schedule: ScheduleAttributes) => {
  const tableName = `schedule_${date
    .toISOString()
    .split("T")[0]
    .replace(/-/g, "_")}`;

  // 创建动态模型
  const Schedule = await createDynamicModel(tableName);

  // 同步表结构，alter: true 确保表结构与模型一致
  await Schedule.sync({ alter: true });

  try {
    // 插入数据并返回插入的记录
    const insertedRecord = await Schedule.create({
      content: schedule.content,
      category: schedule.category,
      timeMode: schedule.timeMode,
      startTime: new Date(schedule.startTime),
      endTime: new Date(schedule.endTime),
      probableTime: schedule.probableTime,
      isAware: schedule.isAware,
    });

    return insertedRecord; // 返回插入的记录
  } catch (error) {
    throw new Error("Error inserting data");
  }
};

//删除某个活动
export const deleteData=async(date:Date,id:number)=>{
  const tableName = `schedule_${date
    .toISOString()
    .split("T")[0]
    .replace(/-/g, "_")}`;

  // 创建动态模型
  const Schedule = await createDynamicModel(tableName);
  // 同步表结构，alter: true 确保表结构与模型一致
  await Schedule.sync({ alter: true });
  try{
    const deletedata=await Schedule.destroy({
      where:{
        id:id
      }
    });
    if(deletedata){
      console.log('Data deleted success');
      return deletedata;
    }else{
      console.log('No data found to deleted');
    }
  }catch(error){
    console.error('Error deleting data',error);
  }
  
};
