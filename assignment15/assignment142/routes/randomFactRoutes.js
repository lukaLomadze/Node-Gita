import express from "express";
import { getRandomFact } from "../controllers/randomFactController.js";
import { randomBlock } from "../middleware/randomBlock.js";

const router = express.Router();

router.get("/", randomBlock, getRandomFact);

export default router;
