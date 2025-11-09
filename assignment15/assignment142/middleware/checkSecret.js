export const checkSecret = (req, res, next) => {
  const secret = req.header("secret");
  if (secret !== "random123") {
    return res.status(403).json({ error: "Unauthorized: Missing or invalid secret header" });
  }
  next();
};
