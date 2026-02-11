// initializing package.json with npm init -y
// installing express package by command npm install express
const express = require("express");

const app = express();

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.get("/about", (req, res) => {
  res.send("About Page");
});

app.listen(3000);
