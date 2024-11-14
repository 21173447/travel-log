import express from "express";
import {
  createTravel,
  deleteTravel,
  getTravel,
  upDateTravel,
} from "../controller/travelLog.js";

const router = express.Router();
router.get("/", getTravel);
router.post("/", createTravel);
router.delete("/:id", deleteTravel);
router.put("/:id", upDateTravel);

export default router;
