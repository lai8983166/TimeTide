// src/routes/index.ts
import { Router } from 'express';

const router: Router = Router();

router.get('/', (req, res) => {
  res.send('Welcome to the Express server with TypeScript!');
});

export { router };
