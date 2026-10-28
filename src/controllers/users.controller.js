const db = require("../config/db");
const bcrypt = require("bcrypt");

const getAllUsers = async (req, res) => {
  try {
    const [users] = await db.query(
      "SELECT id, username, email FROM users LIMIT 10;",
    );

    if (users.length === 0) {
      return res.status(404).json({
        msg: "no users found!",
      });
    }

    res.status(200).json({ users });
  } catch (err) {
    console.error("=X> FAILED FETCHING ALL USERS!");
    res.status(500).json({
      msg: "failed fetching all users!",
    });
  }
};

const getOneUser = async (req, res) => {
  try {
    const { id } = req.params;

    const [users] = await db.query(
      "SELECT id, username, email, created_at FROM users WHERE id = ?;",
      [id],
    );

    if (users.length === 0) {
      return res.status(404).json({
        msg: "user with given id not found!",
      });
    }

    res.status(200).json({ user: users[0] });
  } catch (err) {
    console.error("=X> FAILED FETCHING ONE USER!");
    res.status(500).json({
      msg: "failed fetching one user!",
    });
  }
};

const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { username, email, password } = req.body || {};

    if (req.user.id !== Number(id) && req.user.role !== "admin") {
      return res.status(403).json({
        msg: "you are not allowed to modify this user!",
      });
    }

    const users = await db.query("SELECT id FROM users WHERE id = ?", [id]);

    if (users.length === 0) {
      return res.status(404).json({ msg: "user not found!" });
    }

    if (!username && !email && !password) {
      return res.status(400).json({
        msg: "no data provided for updating user!",
      });
    }

    const fields = [];
    const values = [];

    if (username) {
      fields.push("username = ?");
      values.push(username);
    }

    if (email) {
      fields.push("email = ?");
      values.push(email);
    }

    if (password) {
      const hashedPswrd = await bcrypt.hash(password, 10);

      fields.push("password = ?");
      values.push(hashedPswrd);
    }

    values.push(id);

    const [result] = await db.query(
      `UPDATE users SET ${fields.join(", ")} WHERE id = ?;`,
      values,
    );

    res.status(200).json({
      msg: "user updated successfully.",
    });
  } catch (err) {
    console.error("=X> FAILED UPDATING A USER!");
    res.status(500).json({
      msg: "failed updating a user!",
    });
  }
};

module.exports = {
  getAllUsers,
  getOneUser,
  updateUser,
};
