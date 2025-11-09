export const validateExpense = (req, res, next) => {
  const { amount, category } = req.body;
  if (amount === undefined || category === undefined) {
    return res.status(400).json({ error: "Both amount and category are required" });
  }
  if (isNaN(amount) || parseFloat(amount) <= 10) {
    return res.status(400).json({ error: "Amount should be a number greater than 10" });
  }
  next();
};
