const express = require("express");
const fs = require("fs");
// const path = import("path");
const sharp = require("sharp");

const router = express.Router();

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
  let convertedType;


    if (req.params.ext === "jpg" || req.params.ext === "jpeg") {
      mimeType = "image/jpeg";
      convertedType = "jpeg";
    } else if (req.params.ext === "png") {
      mimeType = "image/png";
      convertedType = "png";
    } else {
      res.status(400).send("Invalid file type!");
    }
  
  const convertedFile = `${req.params.id}.${convertedType}`;
  const readStreamConverted = fs.createReadStream(convertedFile);
  if (req.query.convertedType !== req.params.ext) {
    res.header("Content-Type", mimeType);
    if (fs.existsSync(convertedFile)) {
      // download if converted file already exists
      res.setHeader(
        "Content-Disposition",
        "attachment; filename=" + convertedFile
      );
      readStreamConverted.pipe(res);
      console.log("file is not converted, downloading.");
    } else {
      // convert file
      const newFile = `${req.params.id}.${req.params.ext}`
      
      sharp(path)
        .toFormat(convertedType)
        .toFile(`./Images/converted.${convertedType}`, (err) => {
          if (err) {
            console.error(err);
            res
              .status(500)
              .send("There was an error with converting your file.");
          } else {
            // download converted file
            res.setHeader(
              "Content-Disposition",
              "attachment; filename=" + convertedFile
            );
            readStreamConverted.pipe(res);
            console.log("file is converted, downloading.");
          }
        });
    }
  } else {
    // send unconverted file and download
    res.setHeader("Content-Disposition", "attachment; filename=" + file);
    readStream.pipe(res);
    console.log(req.query.convert);
  }

  // if (!fs.existsSync(path)) {
  //   res.status(404).send("File not found");
  // } else {
  //   readStream.on("open", () => {
  //     // set the content type and attachment header
  //     // currently working part
  //     res.setHeader("Content-Type", "application/octet-stream");
  //     res.setHeader("Content-Disposition", "attachment; filename=" + file);

  //     // pipe the read stream to the response object
  //     readStream.pipe(res);
  //     console.log(req.params);
  //     console.log(req.params.ext);

  //     console.log(mimeType);
  //   });

  //   readStream.on("error", (err) => {
  //     res.end(err);
  //   });
  // }
});

module.exports = router;
