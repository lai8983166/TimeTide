// src/app.ts
import express from "express";
import sequelize from "./config/db";
import "./models/Log"; // 确保导入模型，触发模型的初始化
import "./models/DateLog";
import route from "./routes/index";
import cors from 'cors';

const app = express();

// Middleware
app.use(cors({
  origin: 'http://localhost:5173'  // 只允许来自 localhost:5173 的请求
}));

app.use(express.json());

// 路由
app.use("/route", route);

// 启动应用
const startServer = async () => {
  try {
    await sequelize.authenticate(); // 测试数据库连接
    console.log("Database connected successfully.");

    // force: true 会先删除表然后重新创建
    await sequelize.sync({ force: true });
    console.log("Table created successfully.");

    app.listen(3001, () => {
      console.log("Server running on http://localhost:3001");
    });
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

startServer();
