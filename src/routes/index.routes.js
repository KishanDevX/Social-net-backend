const express = require("express");
const authenticate = require("../middleware/auth.middleware");

const router = express.Router();

router.get("/", (req, res) => {
    res.json({
        msg: "Entry point of socialnet!"
    })
})

router.get("/protected", authenticate, (req, res) => {
    res.json({
        msg: "you are authenticated.",
        user: req.user
    })
})

module.exports = router