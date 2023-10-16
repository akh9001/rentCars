const express = require("express");
const app = express();
const port = 3000;

// Example route
app.get("/", (req, res) => {
  res.send("Hello, Express!");
});

app.listen(port, () => {
  console.log("Server is running on port " + port);
});
