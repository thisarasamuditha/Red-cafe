import db from "../db/db.js";

export const addUserItem = (userId, itemId, quantity, res) => {
  db.query("INSERT INTO user_items (user_id, item_id, quantity) VALUES (?, ?, ?)", [userId, itemId, quantity], (err, results) => {
    if (err) {
      console.log(err);
      return res.status(500).send("Internal server error");
    }
    res.status(201).send("Item associated with user successfully");
  });
};

export const deleteUserItem = (userId, itemId, res) => {
  db.query("DELETE FROM user_items WHERE user_id = ? AND item_id = ?", [userId, itemId], (err, results) => {
    if (err) {
      console.log(err);
      return res.status(500).send("Internal server error");
    }
    res.status(200).send("Item removed from user successfully");
  });
};

export const updateUserItemQuantity = (userId, itemId, quantity, res) => {
  db.query("UPDATE user_items SET quantity = ? WHERE user_id = ? AND item_id = ?", [quantity, userId, itemId], (err, results) => {
    if (err) {
      console.log(err);
      return res.status(500).send("Internal server error");
    }
    res.status(200).send("Item quantity updated successfully");
  });
};