import express from "express";
import { readFile, writeFile } from "./utils.js";

const app = express();
app.use(express.json());


app.post("/expenses", async (req, res) => {
  try {
    const { amount, category } = req.body;

    if (isNaN(amount) || parseFloat(amount) <= 10) {
      return res.status(400).json({ error: "Amount should be a number greater than 10" });
    }
    if (!category) {
      return res.status(400).json({ error: "Category is required" });
    }
    const expenses = (await readFile("expenses.json", true)) || [];
    const lastId = expenses.length > 0 ? expenses[expenses.length - 1].id : 0;

    const newExpense = {
      id: lastId + 1,
      amount: parseFloat(amount),
      category,
      date: new Date().toISOString(),
    };

    expenses.push(newExpense);
    await writeFile("expenses.json", expenses);

    res.status(201).json({ message: "Expense added", expense: newExpense });
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});


app.get("/expenses", async (req, res) => {
  try {
    let { page = 1, take = 10, } = req.query;
    page = Number(page);
    take = Math.min(Number(take), 30); // upper limit of 30

    if (isNaN(page) || isNaN(take) || page < 1 || take < 1) {
      return res.status(400).json({ error: "Page and take must be positive numbers" });
    }

    let expenses = await readFile("expenses.json", true);
    const start = (page - 1) * take;
    const ans = expenses.slice(start, start + take);
    res.status(200).json(ans);

  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});


app.get("/expenses/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const expenses = await readFile("expenses.json", true);
    const index = expenses.findIndex((e) => e.id === id);
    if (index == -1) return res.status(404).json({ error: "Expense not found" });
    res.status(200).json(expenses[index]);
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});


app.put("/expenses/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const { amount, category } = req.body;

    const expenses = await readFile("expenses.json", true);
    const index = expenses.findIndex((e) => e.id === id);
    if (index === -1) return res.status(404).json({ error: "Expense not found" });
    const newData = {};

    if (!amount) {
      return res.status(400).json({ error: "Amount is required" });
    }
    if (!category) {
      return res.status(400).json({ error: "Category is required" });
    } else newData.category = category;

    if (amount !== undefined) {
      if (isNaN(amount) || parseFloat(amount) <= 10) {
        return res.status(400).json({ error: "Amount should be a number greater than 10" });
      }
      newData.amount = parseFloat(amount);
    }

    expenses[index] = { ...expenses[index], ...newData };
    await writeFile("expenses.json", expenses);

    res.status(200).json({ message: "Expense updated", expense: expenses[index] });
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});


app.delete("/expenses/:id", async (req, res) => {
  try {
    const secret = req.header("secret");
    if (secret !== "random123") {
      return res.status(403).json({ error: "Unauthorized: Missing or invalid secret header" });
    }

    const id = parseInt(req.params.id);
    const expenses = await readFile("expenses.json", true);
    const index = expenses.findIndex((e) => e.id === id);

    if (index === -1) {
      return res.status(404).json({ error: "Expense not found" });
    }

    const deleted = expenses.splice(index, 1)[0];
    await writeFile("expenses.json", expenses);

    res.status(200).json({ message: "Expense deleted", deleted });
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});



app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
