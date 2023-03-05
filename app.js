const express = require("express");
const multer = require("multer");
const path = require("path");
const { uuid } = require("uuidv4");
const port = 3050;
const fs = require("fs");

const app = express();

const storage = multer.diskStorage({
  destination: "./Images",
  filename: (req, file, callback) => {
    console.log(file);
    callback(null, uuid().slice(0, 7) + path.extname(file.originalname));
    // note, i used a slice here to reduce the overall length of the uuid.
    // its just to make it look cleaner, but we can remove it easy.
  },
});

//  -------- file filtering for images -------------- //
let fileFilter = function (req, file, cb) {
  console.log(file.mimetype);
  const allowedMimes = ["image/jpeg", "image/jpg", "image/png", "image/gif", "image/svg+xml"];

  if (allowedMimes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    return cb(new Error("only images are allowed!"));
    // this is so that anything other than the above images will throw an error and crash this.
  }
};

const upload = multer({ storage: storage, fileFilter: fileFilter }).single(
  "image"
);

// --------------main section ----------- //

app.set("view engine", "ejs");
// also using ejs for easy viewing

app.get("/", (req, res) => {
  res.render("main");
});

// --------------end main section ----------- //

// --------------upload section ------------ //

app.get("/upload", (req, res) => {
    res.render("upload");
  });
  
  app.post("/upload", upload, (req, res) => {
    res.render("uploaded")
    console.log(req.file.buffer);
  });

// --------------end upload section ----------- //

// --------------download section ----------- //

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
      // res.sendFile(path, {root: __dirname});
    }
  });


// --------------end download section ----------- //

// app listener
app.listen(port);
console.log("listening on port" + `${port}`);
