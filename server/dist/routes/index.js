"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
// src/routes/index.ts
const express_1 = require("express");
const router = (0, express_1.Router)();
exports.router = router;
router.get('/', (req, res) => {
    res.send('Welcome to the Express server with TypeScript!');
});
