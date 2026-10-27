const express = require("express");

const router = express.Router();

router.get("/", (req, res) => {
    res.json({
        msg: "Entry point of socialnet!"
    })
})

module.exports = router