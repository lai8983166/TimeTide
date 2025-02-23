"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// src/routes/index.ts
const express_1 = require("express");
const api_1 = require("../apis/api");
const router = (0, express_1.Router)();
router.post("/buildtable", api_1.buildTable);
router.post("/buildschedule", api_1.buildSchedule);
router.get("/gettable", api_1.getTable);
router.post("/deleshcedule", api_1.deleteSchedule);
exports.default = router;
