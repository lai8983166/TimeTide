// src/routes/index.ts
import { Router, Request, Response } from "express";
import { buildSchedule, buildTable, getTable } from "../apis/api";

const router: Router = Router();

router.post("/buildtable", buildTable);
router.post("/buildschedule", buildSchedule);
router.get("/gettable", getTable);

export default router;
