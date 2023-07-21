const express = require("express");
const app = express();
const engine = require("ejs-locals");
const fs = require("fs");
const folderName = "lesson5";

app.use(express.static(`./${folderName}/public`));
app.engine("ejs", engine);
app.set("views", `./${folderName}`);
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  const data = fs.readFileSync(`./${folderName}/users.json`);
  const users = JSON.parse(data);
  const index = req.query.index;
  res.render("hello", {users});
});

app.get("/view", (req, res) => {
  const data = fs.readFileSync(`./${folderName}/users.json`);
  const users = JSON.parse(data);
  const index = req.query.index;
  const user = users[index];
  res.send(`<h1>${user.name}同學，您好！</h1>`);
});

app.listen(3000);
