import { Request, Response } from "express";
import {
  insertData,
  ScheduleAttributes,
  ScheduleInstance,
  createDynamicModel,
  createTableByDate,
  getTableData,
  deleteData,
} from "../models/Schedule";

// 获取某个日期的表
export const getTable = async (req: Request, res: Response): Promise<void> => {
  const { date }: { date: string } = req.query as { date: string };

  // 确保 date 参数存在
  if (!date) {
    res.status(400).json({ error: "Date parameter is required" });
  }

  try {
    // 使用日期参数获取表格数据
    const table = await getTableData(new Date(date));
    res.status(200).json({
      data: table,
      message: "Get table success",
    });
  } catch (error) {
    const e = error as Error;
    res.status(500).json({ error: e.message });
  }
};

//获取某段时期的表
export const getTables = async (req: Request, res: Response) => {};

//获取某个表中某种类型的活动记录
export const getSchedule = async () => {};

//将某个活动设置为提醒
export const setAware = async (id: number) => {};

//创建某个日期的表
export const buildTable = async (req: Request, res: Response) => {
  const { date }: { date: string } = req.body; // 解构获取 date 字段
  try {
    const table = await createTableByDate(new Date(date));
    res.status(200).json({
      data: table,
      message: "build table success",
    });
  } catch (error) {
    const e = error as Error;
    res.status(500).json({ error: e.message });
  }
};

//创建一个活动
export const buildSchedule = async (req: Request, res: Response) => {
  const { date, schedule }: { date: string; schedule: ScheduleAttributes } =
    req.body;
  try {
    const sche = await insertData(new Date(date), schedule);
    // 如果返回的是 Sequelize 实例，可以使用 .get() 方法来获取原始数据
    const scheData = sche.get({ plain: true });
    res.status(200).json({
      data: scheData || {},
      message: "success",
    });
  } catch (error) {
    const e = error as Error;
    res.status(500).json({ error: e.message });
  }
};

//删除一个活动
export const deleteSchedule=async (req:Request,res:Response)=>{
  const {date,id}:{date:string;id:number}=req.body;
  try{
    const dele=await deleteData(new Date(date),id);
    
    res.status(200).json({
      data:dele,
      message:"dele success",
    });
  }catch(error){
    const e= error as Error;
    res.status(500).json({error:e.message});
  }
};
