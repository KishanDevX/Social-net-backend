const express = require("express");
const authenticate = require("../middleware/auth.middleware")
const { getAllUsers, getOneUser, updateUser } = require("../controllers/users.controller");

const router = express.Router();

router.get("/", getAllUsers);
router.get("/:id", getOneUser);
router.patch("/:id", authenticate, updateUser)

module.exports = router;
