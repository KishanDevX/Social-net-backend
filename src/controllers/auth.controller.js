const bcrypt = require("bcrypt");
const db = require("../config/db");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
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
    console.error("=X> ERROR REGISTERING USER! \n", err);
    res.status(500).json({
      msg: "failed registering user!",
    });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body || {};

    if (!email || !password) {
      return res.status(400).json({
        msg: "email and password is required!",
      });
    }

    const [users] = await db.query("SELECT * FROM users WHERE email = ?", [
      email,
    ]);

    if (users.length === 0) {
      return res.status(401).json({
        msg: "invalid email or password!",
      });
    }

    const user = users[0];

    const pswrdMatches = await bcrypt.compare(password, user.password);

    if (!pswrdMatches) {
      return res.status(401).json({
        msg: "invalid username or password!",
      });
    }

    const token = jwt.sign(
      {
        id: user.id,
        role: user.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      },
    );

    res.status(200).json({
        msg: "login successful.", 
        token
    })

  } catch (err) {
    console.error("=X> ERROR USER LOGGING IN! \n", err);
    res.status(500).json({
      msg: "failed logging user!",
    });
  }
};

module.exports = {
  register,
  login
};
