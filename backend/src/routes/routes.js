import express from "express";
import { fetchBarChart, fetchLineChart, fetchTable, newCensus } from "../controllers/controllers.js";

const router = express.Router();

router.post("/vote", newCensus);

router.get("/data", fetchTable);
router.get("/counts",fetchLineChart);
router.get("/results", fetchBarChart);

export default router;