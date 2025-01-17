// src/types/express.d.ts
import { Log } from '../models/Log'; // 导入 Logs 模型，如果你没有导入，可以跳过

declare global {
  namespace Express {
    interface Request {
      log?: Log; // 扩展 Request 类型
    }
  }
}