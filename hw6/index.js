const express = require("express");
const app = express();
const engine = require("ejs-locals");
const fs = require("fs");
const bodyParser = require("body-parser");

const folder = "hw6";

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(`./${folder}/public`));
app.engine("ejs", engine);
app.set("views", `./${folder}`);
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  const data = fs.readFileSync(`./${folder}/posts.json`);
  const posts = JSON.parse(data);
  res.render("homepage", {posts});
});

app.get("/view", (req, res) => {
  const data = fs.readFileSync(`./${folder}/posts.json`);
  const posts = JSON.parse(data);
  const index = req.query.index;
  const post = posts[index];
  res.render("view", {post});
});

app.post("/create", (req, res) => {
  const data = fs.readFileSync(`./${folder}/posts.json`);
  const posts = JSON.parse(data);
  const title = req.body.title;
  const content = req.body.content;
  posts.push({title, content});
  fs.writeFileSync(`./${folder}/posts.json`, JSON.stringify(posts));
  res.redirect("/");
});

app.get("/new", (req, res) => res.render("new"));

app.listen(3000);
