import express from "express";
import {
  createResidency,
  getAllResidencies,
  getResidency,
  deleteResidency
} from "../controllers/resdCntrl.js";

const router = express.Router();

router.post("/create", createResidency);
router.get("/allresd", getAllResidencies);
router.get("/:id", getResidency);
router.delete("/deleteresd/:id",deleteResidency);

export { router as residencyRoute };
