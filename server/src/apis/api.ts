import { Request, response } from "express";
import {
  getScheduleByDateAndCategory,
  getTableByDate,
  getTableByDateRange,
  setScheduleAware,
} from "../services/services";
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
export const buildSchedule = async () => {};
