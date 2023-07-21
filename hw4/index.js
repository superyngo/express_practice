const express = require("express");
const app = express();
const engine = require("ejs-locals");
const fs = require("fs");
const folder = "hw4";

app.use(express.static(`./${folder}/public`));
app.engine("ejs", engine);
app.set("views", `./${folder}`);
app.set("view engine", "ejs");
app.get("/", (req, res) => {
  const data = fs.readFileSync(`./${folder}/posts.json`);
  const posts = JSON.parse(data);
  res.render("homepage", {posts});
});

app.listen(3000);
