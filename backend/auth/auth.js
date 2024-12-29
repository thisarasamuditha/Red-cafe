import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import db from "../db/db.js";

const JWT_SECRET = "IHSWCDWHDPSCSCNSCL"; // Replace with your actual secret

export const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(String(email).toLowerCase());
};

export const registerUser = async (username, EmailAddress, password, isAdmin, res) => {
  try {
    if (!validateEmail(EmailAddress)) {
      return res.status(400).json({ message: "Invalid email address" });
    }

    db.query("SELECT * FROM users WHERE user_name = ? OR `Email Address` = ?", [username, EmailAddress], async (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ message: "Internal server error" });
      }
      if (results.length > 0) {
        return res.status(400).json({ message: "User already exists" });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      db.query("INSERT INTO users (user_name, `Email Address`, password, is_admin) VALUES (?, ?, ?, ?)", [username, EmailAddress, hashedPassword, isAdmin], (err, results) => {
        if (err) {
          console.log(err);
          return res.status(500).json({ message: "Internal server error" });
        }
        res.status(201).json({ message: "User registered successfully" });
      });
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

export const loginUser = async (EmailAddress, password, res) => {
  try {
    if (!validateEmail(EmailAddress)) {
      return res.status(400).json({ message: "Invalid email address" });
    }

    db.query("SELECT * FROM users WHERE `Email Address` = ?", [EmailAddress], async (err, results) => {
      if (err) {
        return res.status(500).json({ message: "Internal server error" });
      }
      if (results.length === 0) {
        return res.status(400).json({ message: "Invalid email or password" });
      }

      const user = results[0];
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: "**Invalid email or password" });
      }

      // Generate JWT
      const token = jwt.sign({ id: user.id, username: user.user_name, isAdmin: user.is_admin }, JWT_SECRET, { expiresIn: '1h' });

      res.json({ message: "login successful", token });
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};