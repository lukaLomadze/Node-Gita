export const randomBlock = (req, res, next) => {
  const block = Math.random() < 0.5;
  if (block) {
    return res.status(403).json({ error: "Randomly blocked request" });
  }
  next();
};
