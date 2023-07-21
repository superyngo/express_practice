const express = require("express");
const app = express();
const engine = require("ejs-locals");
const fs = require("fs");

app.use(express.static("./lesson4/public"));
app.engine("ejs", engine);
app.set("views", "./lesson4");
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  const data = fs.readFileSync("./lesson4/users.json");
  const users = JSON.parse(data);
  res.render("hello", {users});
});

app.listen(3000);
