// src/app.ts
import express, { Application } from 'express';
import cors from 'cors';
import { router } from './routes/index';

const app: Application = express();

// Middleware
app.use(cors());
app.use(express.json());

// 路由
app.use('/api', router);

// 错误处理
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send('Something went wrong!');
});

export default app;
