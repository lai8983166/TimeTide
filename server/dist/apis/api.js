"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteSchedule = exports.buildSchedule = exports.buildTable = exports.setAware = exports.getSchedule = exports.getTables = exports.getTable = void 0;
const Schedule_1 = require("../models/Schedule");
// 获取某个日期的表
const getTable = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { date } = req.query;
    // 确保 date 参数存在
    if (!date) {
        res.status(400).json({ error: "Date parameter is required" });
    }
    try {
        // 使用日期参数获取表格数据
        const table = yield (0, Schedule_1.getTableData)(new Date(date));
        res.status(200).json({
            data: table,
            message: "Get table success",
        });
    }
    catch (error) {
        const e = error;
        res.status(500).json({ error: e.message });
    }
});
exports.getTable = getTable;
//获取某段时期的表
const getTables = (req, res) => __awaiter(void 0, void 0, void 0, function* () { });
exports.getTables = getTables;
//获取某个表中某种类型的活动记录
const getSchedule = () => __awaiter(void 0, void 0, void 0, function* () { });
exports.getSchedule = getSchedule;
//将某个活动设置为提醒
const setAware = (id) => __awaiter(void 0, void 0, void 0, function* () { });
exports.setAware = setAware;
//创建某个日期的表
const buildTable = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { date } = req.body; // 解构获取 date 字段
    try {
        const table = yield (0, Schedule_1.createTableByDate)(new Date(date));
        res.status(200).json({
            data: table,
            message: "build table success",
        });
    }
    catch (error) {
        const e = error;
        res.status(500).json({ error: e.message });
    }
});
exports.buildTable = buildTable;
//创建一个活动
const buildSchedule = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { date, schedule } = req.body;
    try {
        const sche = yield (0, Schedule_1.insertData)(new Date(date), schedule);
        // 如果返回的是 Sequelize 实例，可以使用 .get() 方法来获取原始数据
        const scheData = sche.get({ plain: true });
        res.status(200).json({
            data: scheData || {},
            message: "success",
        });
    }
    catch (error) {
        const e = error;
        res.status(500).json({ error: e.message });
    }
});
exports.buildSchedule = buildSchedule;
//删除一个活动
const deleteSchedule = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { date, id } = req.body;
    try {
        const dele = yield (0, Schedule_1.deleteData)(new Date(date), id);
        res.status(200).json({
            data: dele,
            message: "dele success",
        });
    }
    catch (error) {
        const e = error;
        res.status(500).json({ error: e.message });
    }
});
exports.deleteSchedule = deleteSchedule;
