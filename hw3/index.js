const express = require("express");
const app = express();
const engine = require("ejs-locals");
const fs = require("fs");

app.engine("ejs", engine);
app.set("views", "./hw3");
app.set("view engine", "ejs");
app.get("/", (req, res) => {
  const data = fs.readFileSync("./hw3/posts.json");
  const posts = JSON.parse(data);
  res.render("homepage", {posts});
});

app.listen(3000);
