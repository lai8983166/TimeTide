import { Request, Response } from "express";
import {
  getScheduleByDateAndCategory,
  getTableByDate,
  getTableByDateRange,
  setScheduleAware,
} from "../services/services";
import{
  insertData,
  ScheduleAttributes,
  ScheduleInstance,
  createDynamicModel,
  createTableByDate,
  getTableData
}from "../models/Schedule";
import Log from "../models/Log";
import DateLog from "../models/DateLog";

//获取某个日期的表
export const getTable = async (req: Request, res: Response) => {};

//获取某段时期的表
export const getTables = async (req: Request, res: Response) => {};

//获取某个表中某种类型的活动记录
export const getSchedule = async () => {};

//将某个活动设置为提醒
export const setAware = async (id: number) => {};

//创建某个日期的表
export const buildTable = async (data: Date) => {};

//创建一个活动
export const buildSchedule = async (req:Request,res:Response) => {
  const { date, schedule }: { date: string, schedule: ScheduleAttributes } = req.body;
  try{
    const sche=await insertData(new Date(date),schedule);
    // 如果返回的是 Sequelize 实例，可以使用 .get() 方法来获取原始数据
    const scheData = sche.get({ plain: true });
    res.status(200).json({
      data: scheData || {},
      message:"success"
    });

  }catch(error){
    const e=error as Error;
    res.status(500).json({error:e.message});
  }
};
