import bcrypt from 'bcrypt';
import db from '../db/db.js';

export const registerUser = async (username, email, password, isAdmin, res) => {
  try {
    // Check if the user already exists
    const userExists = await new Promise((resolve, reject) => {
      db.query('SELECT * FROM users WHERE user_name = ? OR email_address = ?', [username, email], (err, results) => {
        if (err) return reject(err);
        resolve(results.length > 0);
      });
    });

    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert the new user into the database
    db.query(
      'INSERT INTO users (user_name, email_address, password, is_admin) VALUES (?, ?, ?, ?)',
      [username, email, hashedPassword, isAdmin],
      (err, results) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ message: 'Internal server error' });
        }
        res.status(201).json({ message: 'User created successfully' });
      }
    );
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const loginUser = (email, password, res) => {
  db.query('SELECT * FROM users WHERE email_address = ?', [email], async (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Internal server error' });
    }

    if (results.length === 0) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    const user = results[0];

    // Compare the password with the hashed password
    try {
      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(400).json({ message: 'Invalid email or password' });
      }

      // Check if the user is an admin
      const isAdmin = user.is_admin === 1;

      res.status(200).json({ message: 'Login successful', isAdmin });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });
};