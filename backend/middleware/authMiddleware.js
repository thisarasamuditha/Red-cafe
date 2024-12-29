import db from "../db/db.js";

export const isAuthenticated = (req, res, next) => {
  const { userId } = req.body;

  if (!userId) {
    return res.status(401).send("Unauthorized: No user ID provided");
  }

  db.query("SELECT * FROM users WHERE id = ?", [userId], (err, results) => {
    if (err) {
      return res.status(500).send("Internal server error");
    }
    if (results.length === 0) {
      return res.status(401).send("Unauthorized: Invalid user ID");
    }
    req.user = results[0];
    next();
  });
};

export const isAdmin = (req, res, next) => {
  if (!req.user.is_admin) {
    return res.status(403).send("Access denied: Admins only");
  }
  next();
};