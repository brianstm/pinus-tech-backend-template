import express from "express";
import {
  createExpense,
  getExpenses,
  getExpenseID,
  updateExpense,
  deleteExpense,
} from "../controllers/expenseController";
import { auth } from "../middleware/auth";

const router = express.Router();
router.use(auth);

router.post("/", createExpense);
router.get("/:id", getExpenseID);
router.get("/", getExpenses);
router.put("/:id", updateExpense);
router.delete("/:id", deleteExpense);

export default router;