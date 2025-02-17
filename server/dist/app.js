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
// src/app.ts
const express_1 = __importDefault(require("express"));
const db_1 = __importDefault(require("./config/db"));
require("./models/Log"); // 确保导入模型，触发模型的初始化
require("./models/DateLog");
const index_1 = __importDefault(require("./routes/index"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
// Middleware
app.use((0, cors_1.default)({
    origin: 'http://localhost:5173' // 只允许来自 localhost:5173 的请求
}));
app.use(express_1.default.json());
// 路由
app.use("/route", index_1.default);
// 启动应用
const startServer = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield db_1.default.authenticate(); // 测试数据库连接
        console.log("Database connected successfully.");
        // force: true 会先删除表然后重新创建
        yield db_1.default.sync({ force: true });
        console.log("Table created successfully.");
        app.listen(3001, () => {
            console.log("Server running on http://localhost:3001");
        });
    }
    catch (error) {
        console.error("Unable to connect to the database:", error);
    }
});
startServer();
