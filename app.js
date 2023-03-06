const express = require("express");
const port = 3050;
const uploadRoute = require("./routes/upload");
const testRoute = require("./routes/test");
const downloadRoute = require("./routes/download");

const app = express();

// main section

app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("main");
});

// upload section

app.get("/upload", uploadRoute);
app.post("/upload", uploadRoute);


// download section

app.get("/download", downloadRoute);
app.get("/Images/:id.:ext", downloadRoute);


// transformation section

// app.get("/transform", testRoute);


// app listener
app.listen(port);
console.log("listening on port" + `${port}`);

module.exports = app
