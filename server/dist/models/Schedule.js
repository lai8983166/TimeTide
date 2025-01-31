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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.insertData = exports.getTableData = exports.createTableByDate = void 0;
exports.createDynamicModel = createDynamicModel;
const sequelize_1 = require("sequelize");
const DateLog_1 = __importDefault(require("./DateLog")); // 引入主表模型
const db_1 = __importDefault(require("../config/db"));
// 动态创建模型的函数
function createDynamicModel(tableName) {
    return __awaiter(this, void 0, void 0, function* () {
        return db_1.default.define(tableName, {
            id: {
                type: sequelize_1.DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            content: {
                type: sequelize_1.DataTypes.STRING,
                allowNull: false,
            },
            category: {
                type: sequelize_1.DataTypes.STRING,
                allowNull: false,
            },
            timeMode: {
                type: sequelize_1.DataTypes.STRING,
                allowNull: false,
            },
            startTime: {
                type: sequelize_1.DataTypes.DATE,
                allowNull: false,
            },
            endTime: {
                type: sequelize_1.DataTypes.DATE,
                allowNull: false,
            },
            probableTime: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false,
            },
            isAware: {
                type: sequelize_1.DataTypes.BOOLEAN,
                allowNull: false,
            },
            createdAt: {
                type: sequelize_1.DataTypes.DATE,
                defaultValue: sequelize_1.DataTypes.NOW,
            },
        }, {
            tableName,
            timestamps: false, // 如果不需要自动添加时间戳字段
        });
    });
}
//根据日期创建表
const createTableByDate = (date) => __awaiter(void 0, void 0, void 0, function* () {
    // 根据日期生成动态表名
    const tableName = `schedule_${date
        .toISOString()
        .split("T")[0]
        .replace(/-/g, "_")}`;
    // 检查主表（dates）中是否已经有该日期记录
    const existingDate = yield DateLog_1.default.findOne({
        where: { date },
    });
    if (!existingDate) {
        // 如果没有该日期记录，则创建新的记录
        yield DateLog_1.default.create({ date });
        console.log(`Added ${date} to the dates table.`);
    }
    //创建动态模型
    const Schedule = yield createDynamicModel(tableName);
    // 同步创建表
    const table = yield Schedule.sync({ alter: true });
    console.log(`Table ${tableName} created or already exists.`);
    return table;
});
exports.createTableByDate = createTableByDate;
//根据表名（日期）获取表中数据
const getTableData = (date) => __awaiter(void 0, void 0, void 0, function* () {
    // 根据日期生成动态表名
    const tableName = `schedule_${date.toString().replace(/-/g, "_")}`;
    //创建动态模型
    const Schedule = yield createDynamicModel(tableName);
    // 同步表结构，alter: true 确保表结构与模型一致
    yield Schedule.sync({ alter: true });
    const schedules = yield Schedule.findAll();
    //查询数据
    schedules.forEach((schedule) => {
        console.log(schedule.id);
    });
});
exports.getTableData = getTableData;
//向某个表（日期）中插入数据
const insertData = (date, schedule) => __awaiter(void 0, void 0, void 0, function* () {
    const tableName = `schedule_${date
        .toISOString()
        .split("T")[0]
        .replace(/-/g, "_")}`;
    // 创建动态模型
    const Schedule = yield createDynamicModel(tableName);
    // 同步表结构，alter: true 确保表结构与模型一致
    yield Schedule.sync({ alter: true });
    try {
        // 插入数据并返回插入的记录
        const insertedRecord = yield Schedule.create({
            content: schedule.content,
            category: schedule.category,
            timeMode: schedule.timeMode,
            startTime: new Date(schedule.startTime),
            endTime: new Date(schedule.endTime),
            probableTime: schedule.probableTime,
            isAware: schedule.isAware,
        });
        return insertedRecord; // 返回插入的记录
    }
    catch (error) {
        throw new Error("Error inserting data");
    }
});
exports.insertData = insertData;
