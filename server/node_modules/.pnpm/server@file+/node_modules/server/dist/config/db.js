"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
// 使用 .env 中的配置来连接数据库
const sequelize = new sequelize_1.Sequelize(process.env.DB_NAME, // 数据库名
process.env.DB_USERNAME, // 用户名
process.env.DB_PASSWORD, // 密码
{
    host: process.env.DB_HOST, // 数据库主机
    dialect: process.env.DB_DIALECT, // 数据库类型
    timezone: process.env.DB_TIMEZONE, // 可选的时区配置
});
exports.default = sequelize;
