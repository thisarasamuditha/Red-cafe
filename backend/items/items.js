import db from "../db/db.js";

export const addItem = (name, description, price, res) => {
  db.query("INSERT INTO items (name, description, price) VALUES (?, ?, ?)", [name, description, price], (err, results) => {
    if (err) {
      console.log(err);
      return res.status(500).send("Internal server error");
    }
    res.status(201).send("Item added successfully");
  });
};

export const getItemDescriptions = (res) => {
  db.query("SELECT description FROM items", (err, results) => {
    if (err) {
      console.log(err);
      return res.status(500).send("Internal server error");
    }
    res.status(200).json(results);
  });
};