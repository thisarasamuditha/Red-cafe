import express from "express";
import { registerUser, loginUser } from "../auth/auth.js";

const router = express.Router();

router.post("/register", (req, res) => {
  const { username, EmailAddress, password, isAdmin } = req.body;
  registerUser(username, EmailAddress, password, isAdmin, res);
});

router.post("/login", (req, res) => {
  const { EmailAddress, password } = req.body;
  loginUser(EmailAddress, password, res);
});

export default router;