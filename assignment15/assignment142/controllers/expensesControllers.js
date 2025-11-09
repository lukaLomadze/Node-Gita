import {
  readAllExpenses,
  addExpense,
  findExpenseById,
  updateExpenseData,
  deleteExpenseById,
} from "../services/expensesService.js";

export const getAllExpenses = async (req, res) => {
  try {
    let { page = 1, take = 10 } = req.query;
    page = Number(page);
    take = Math.min(Number(take), 30);

    if (isNaN(page) || isNaN(take) || page < 1 || take < 1) {
      return res.status(400).json({ error: "Invalid pagination parameters" });
    }

    const expenses = await readAllExpenses();
    const start = (page - 1) * take;
    const result = expenses.slice(start, start + take);

    res.json(result);
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getExpenseById = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const expense = await findExpenseById(id);
    if (!expense) return res.status(404).json({ error: "Expense not found" });
    res.json(expense);
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const createExpense = async (req, res) => {
  try {
    const { amount, category } = req.body;
    const newExpense = await addExpense(amount, category);
    res.status(201).json({ message: "Expense added", expense: newExpense });
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const updateExpense = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const { amount, category } = req.body;
    const updated = await updateExpenseData(id, amount, category);
    if (!updated) return res.status(404).json({ error: "Expense not found" });
    res.json({ message: "Expense updated", expense: updated });
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const deleteExpense = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const deleted = await deleteExpenseById(id);
    if (!deleted) return res.status(404).json({ error: "Expense not found" });
    res.json({ message: "Expense deleted", deleted });
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};
