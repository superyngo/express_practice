const express = require("express");
const app = express();
const engine = require("ejs-locals");
const fs = require("fs");
const bodyParser = require("body-parser");

const folderName = "lesson6";

app.use(express.static(`./${folderName}/public`));
app.engine("ejs", engine);
app.set("views", `./${folderName}`);
app.set("view engine", "ejs");

// Use body-parser middleware for parsing JSON and URL-encoded data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

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

app.get("/new", (req, res) => res.render("new"));

app.post("/create", (req, res) => {
  const name = req.body.name;
  const data = fs.readFileSync(`./${folderName}/users.json`);
  const users = JSON.parse(data);
  users.push({name});
  fs.writeFileSync(`./${folderName}/users.json`, JSON.stringify(users));
  res.redirect("/");
});

app.listen(3000);
