const express = require("express");
const multer = require("multer");
const path = require("path");
const { uuid } = require("uuidv4");
const port = 3050;
const fs = require("fs");
const uploadRoute = require("./routes/upload");
const testRoute = require("./routes/test");

const app = express();

// main section

app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("main");
});


// upload section

app.get("/upload", uploadRoute);
app.post("/upload", uploadRoute);

// test section

app.get("/test", testRoute);

// download section

app.get("/download", (req, res) => {
  res.render("download");
});

app.get("/Images/:id.:ext", (req, res) => {
  const file = `${req.params.id}.${req.params.ext}`;
  const path = `./Images/${file}`;
  const readStream = fs.createReadStream(path);
  if (!fs.existsSync(path)) {
    res.status(404).send("File not found");
  } else {
    readStream.on("open", () => {
      // set the content type and attachment header
      res.setHeader("Content-Type", "application/octet-stream");
      res.setHeader("Content-Disposition", "attachment; filename=" + file);

      // pipe the read stream to the response object
      readStream.pipe(res);
    });

    readStream.on("error", (err) => {
      res.end(err);
    });
  }
});

// app listener
app.listen(port);
console.log("listening on port" + `${port}`);
