import { readFile, writeFile } from "../utils.js";

export async function readAllExpenses() {
  return (await readFile("expenses.json", true)) || [];
}

export async function findExpenseById(id) {
  const expenses = await readAllExpenses();
  return expenses.find((e) => e.id === id);
}

export async function addExpense(amount, category) {
  const expenses = await readAllExpenses();
  const lastId = expenses.length ? expenses[expenses.length - 1].id : 0;
  const newExpense = {
    id: lastId + 1,
    amount: parseFloat(amount),
    category,
    date: new Date().toISOString(),
  };
  expenses.push(newExpense);
  await writeFile("expenses.json", expenses);
  return newExpense;
}

export async function updateExpenseData(id, amount, category) {
  const expenses = await readAllExpenses();
  const index = expenses.findIndex((e) => e.id === id);
  if (index === -1) return null;

  expenses[index] = { ...expenses[index], amount, category };
  await writeFile("expenses.json", expenses);
  return expenses[index];
}

export async function deleteExpenseById(id) {
  const expenses = await readAllExpenses();
  const index = expenses.findIndex((e) => e.id === id);
  if (index === -1) return null;
  const deleted = expenses.splice(index, 1)[0];
  await writeFile("expenses.json", expenses);
  return deleted;
}
