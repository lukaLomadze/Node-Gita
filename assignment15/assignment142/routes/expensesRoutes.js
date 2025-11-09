import express from "express";
import {
  getAllExpenses,
  getExpenseById,
  createExpense,
  updateExpense,
  deleteExpense,
} from "../controllers/expensesControllers.js";

import { checkSecret } from "../middleware/checkSecret.js";
import { validateExpense } from "../middleware/validateExpense.js";

const router = express.Router();

router.get("/", getAllExpenses);
router.get("/:id", getExpenseById);
router.post("/", validateExpense, createExpense);
router.put("/:id", updateExpense);
router.delete("/:id", checkSecret, deleteExpense);

export default router;
