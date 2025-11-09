import express from "express";
import expensesRouter from "./routes/expensesRoutes.js";
import randomFactRouter from "./routes/randomFactRoutes.js";

const app = express();
app.use(express.json());

app.use("/expenses", expensesRouter);
app.use("/random-fact", randomFactRouter);

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
