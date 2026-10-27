const express = require("express");
const bcrypt = require("bcrypt");
const db = require("../config/db");

const router = express.Router();

router.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body || {};

    if (!username || !email || !password) {
      return res.status(400).json({
        msg: "username, email and password is required!",
      });
    }

    const [existingUsers] = await db.query(
      "SELECT id FROM users WHERE username = ? OR email = ?;",
      [username, email],
    );

    if (existingUsers.length > 0) {
      return res.status(409).json({ msg: "username or email already exists!" });
    }

    const hashedPswrd = await bcrypt.hash(password, 10);

    const [result] = await db.query(
      "INSERT INTO users (username, email, password) VALUES (?, ?, ?);",
      [username, email, hashedPswrd],
    );

    res.status(201).json({
      msg: "user registered successfully.",
      userId: result.insertId,
    });

  } catch (err) {
    console.error("=X> ERROR REGISTERING USER! \n", err)
    res.status(500).json({
        msg: "failed registering user!"
    })
  }
});

module.exports = router