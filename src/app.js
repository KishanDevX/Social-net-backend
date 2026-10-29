require("dotenv").config();

const express = require("express");

const indexRoutes = require("./routes/index.routes")
const authRoutes = require("./routes/auth.routes")
const usersRoutes = require("./routes/users.routes")
const postRoutes = require("./routes/post.routes")

const app = express();
app.use(express.json())

app.use("/", indexRoutes)
app.use("/auth", authRoutes)
app.use("/users", usersRoutes)
app.use("/posts", postRoutes)

module.exports = app;