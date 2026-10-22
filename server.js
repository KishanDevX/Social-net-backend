const express = require("express");

const app = express();
const PORT = 3000;

app.use("/", (req, res) => {
  res.json("home page");
});

app.listen(PORT, () => {
  console.log(`Server started- http://localhost:${PORT}`);
});
