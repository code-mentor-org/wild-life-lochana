import express from "express";
import {
  createResidency,
  getAllResidencies,
  getResidency,
  deleteResidency,
  updateResidency
} from "../controllers/resdCntrl.js";

const router = express.Router();

router.post("/create", createResidency);
router.get("/allresd", getAllResidencies);
router.get("/:id", getResidency);
router.delete("/deleteresd/:id",deleteResidency);
router.patch("/update/:id",updateResidency);

export { router as residencyRoute };
