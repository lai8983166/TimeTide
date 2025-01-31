"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// src/routes/index.ts
const express_1 = require("express");
const api_1 = require("../apis/api");
const router = (0, express_1.Router)();
router.post("/buildtable", api_1.buildTable);
router.post("/buildschedule", api_1.buildSchedule);
exports.default = router;
