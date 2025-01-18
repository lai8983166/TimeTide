"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const db_1 = __importDefault(require("../config/db"));
class Log extends sequelize_1.Model {
}
Log.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
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
}, {
    sequelize: db_1.default, // 连接实例
    modelName: 'Log',
    tableName: 'logs', // 指定表名
    timestamps: false, // 不使用自动时间戳
});
exports.default = Log;
