// src/routes/index.ts
import { Router } from "express";
import { buildSchedule, buildTable } from "../apis/api";

const router: Router = Router();

router.post("/buildtable", buildTable);
router.post("/buildschedule", buildSchedule);

export default router;
