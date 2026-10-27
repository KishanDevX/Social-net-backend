const express = require("express");
const bcrypt = require("bcrypt");
const db = require("../config/db");

const { register, login } = require("../controllers/auth.controller");

const router = express.Router();

router.post("/register", register);
router.post("/login", login)

module.exports = router