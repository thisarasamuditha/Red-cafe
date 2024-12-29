import express from "express";
import { addUserItem, deleteUserItem, updateUserItemQuantity } from "../userItems/userItems.js";
import db from "../db/db.js";

const router = express.Router();

router.post("/", (req, res) => {
  const { userId, itemName, quantity } = req.body;

  // Find the itemId based on the itemName
  db.query("SELECT id FROM items WHERE name = ?", [itemName], (err, results) => {
    if (err) {
      return res.status(500).json({ message: "Internal server error" });
    }
    if (results.length === 0) {
      return res.status(400).json({ message: "Item not found" });
    }

    const itemId = results[0].id;
    addUserItem(userId, itemId, quantity, res);
  });
});

router.delete("/", (req, res) => {
  const { userId, itemName } = req.body;

  // Find the itemId based on the itemName
  db.query("SELECT id FROM items WHERE name = ?", [itemName], (err, results) => {
    if (err) {
      return res.status(500).json({ message: "Internal server error" });
    }
    if (results.length === 0) {
      return res.status(400).json({ message: "Item not found" });
    }

    const itemId = results[0].id;
    deleteUserItem(userId, itemId, res);
  });
});

router.put("/", (req, res) => {
  const { userId, itemName, quantity } = req.body;

  // Find the itemId based on the itemName
  db.query("SELECT id FROM items WHERE name = ?", [itemName], (err, results) => {
    if (err) {
      return res.status(500).json({ message: "Internal server error" });
    }
    if (results.length === 0) {
      return res.status(400).json({ message: "Item not found" });
    }

    const itemId = results[0].id;
    updateUserItemQuantity(userId, itemId, quantity, res);
  });
});

export default router;