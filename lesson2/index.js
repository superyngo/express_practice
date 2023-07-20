const express = require("express");
const app = express();
const engine = require("ejs-locals");

app.engine("ejs", engine);
app.set("views", "./lesson2");
app.set("view engine", "ejs");

app.get("/", (req, res) => res.render("hello"));

app.listen("3000");
