require("dotenv").config();

const express = require("express");

const indexRoutes = require("./routes/index.routes")
const authRoutes = require("./routes/auth.routes")

const app = express();
app.use(express.json())

app.use("/", indexRoutes)
app.use("/auth", authRoutes)

module.exports = app;