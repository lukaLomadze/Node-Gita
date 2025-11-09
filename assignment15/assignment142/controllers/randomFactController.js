import { fetchRandomFact } from "../services/randomFaxtServices.js";

export const getRandomFact = (req, res) => {
  try {
    const fact = fetchRandomFact();
    res.json({ fact });
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};
