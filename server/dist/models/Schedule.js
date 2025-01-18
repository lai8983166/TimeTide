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
const sequelize_1 = require("sequelize");
const DateLog_1 = __importDefault(require("./DateLog")); // 引入主表模型
const db_1 = __importDefault(require("../config/db"));
// 动态创建表并插入数据
function createScheduleForDate(date, event) {
    return __awaiter(this, void 0, void 0, function* () {
        // 根据日期生成动态表名
        const tableName = `schedule_${date.replace(/-/g, '_')}`;
        // 检查主表（dates）中是否已经有该日期记录
        const existingDate = yield DateLog_1.default.findOne({
            where: { date },
        });
        if (!existingDate) {
            // 如果没有该日期记录，则创建新的记录
            yield DateLog_1.default.create({ date });
            console.log(`Added ${date} to the dates table.`);
        }
        // 动态定义模型，避免直接写原生 SQL
        const Schedule = db_1.default.define(tableName, {
            id: {
                type: sequelize_1.DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            event: {
                type: sequelize_1.DataTypes.STRING,
                allowNull: false,
            },
            createdAt: {
                type: sequelize_1.DataTypes.DATE,
                defaultValue: sequelize_1.DataTypes.NOW,
            },
        }, {
            tableName, // 动态设置表名
            timestamps: false,
        });
        // 同步创建表
        yield Schedule.sync({ alter: true });
        console.log(`Table ${tableName} created or already exists.`);
        // 插入日程数据
        yield Schedule.create({ event });
        console.log(`Event '${event}' added to ${tableName}.`);
    });
}
