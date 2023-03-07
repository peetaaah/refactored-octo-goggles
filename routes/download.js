const express = require("express");
const fs = require("fs");
const sharp = require("sharp");
const { uuid } = require("uuidv4");
const shortened = uuid().slice(0, 5);

const router = express.Router();

const file = `${req.params.id}.${req.params.ext}`;
const path = `./images/${file}`;
const readStream = fs.createReadStream(path);

const changeFormat =() => {
  sharp(!fs.existsSync(path))
  .toFormat(fs.existsSync(path))
}

router.get("/download", (req, res) => {
  res.render("download");
});

// const allowedMimes = [
//   "image/jpeg",
//   "image/jpg",
//   "image/png",
//   "image/gif",
//   "image/svg+xml",
// ];

router.get("/Images/:id.:ext", (req, res) => {
  const file = `${req.params.id}.${req.params.ext}`;
  const path = `./Images/${file}`;
  const readStream = fs.createReadStream(path);
  let mimeType;
  let convertedType = req.params.ext;

  if (req.params.ext === "jpg" || req.params.ext === "jpeg") {
    mimeType = "image/jpeg";
    convertedType = "jpg";
  } else if (req.params.ext === "png") {
    mimeType = "image/png";
    convertedType = "png";
  } else {
    res.status(400).send("Invalid file type!");
  }

  res.header("Content-Type", mimeType);
  let convertedFile = `./Images/${req.params.id}.${convertedType}`;
  console.log(convertedFile);
  console.log(convertedType);

  if (req.query.convert) {
    if (fs.existsSync(convertedFile)) {
      //   download normal file, unchanged format
      res.setHeader("Content-Disposition", "attachment; filename=" + file);
      readStream.pipe(res);
      console.log("file is NOT converted, downloading.");
    } else {
        // create new file with convertedType
      sharp(path)
        .toFormat(convertedType)
        .toFile(`./Converted/${shortened}.${convertedFile}`, (err) => {
          if (err) {
            console.error(err);
            console.log();
            res
              .status(500)
              .send("There was an error with converting your file.");
          } else {
            // download converted file
            res.setHeader(
              "Content-Disposition",
              "attachment; filename=" + convertedFile
            );
            fs.createReadStream(convertedFile).pipe(res);
            console.log("file is converted, downloading.");
          }
        });
    }
  }
});

module.exports = router;
