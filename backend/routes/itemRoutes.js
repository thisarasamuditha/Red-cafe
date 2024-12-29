import express from "express";
import { addItem, getItemDescriptions } from "../items/items.js";
import { isAuthenticated, isAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

// Route for non-admin users to add items
router.post("/", isAuthenticated, (req, res) => {
  const { name, description, price } = req.body;
  addItem(name, description, price, res);
});

// Route for admins to get item descriptions
router.get("/descriptions", isAuthenticated, isAdmin, (req, res) => {
  getItemDescriptions(res);
});

export default router;