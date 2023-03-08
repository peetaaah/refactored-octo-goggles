const express = require("express");
const fs = require("fs");
const sharp = require("sharp");
const { uuid } = require("uuidv4");
const shortened = uuid().slice(0, 5);

const router = express.Router();

router.get("/download", (req, res) => {
  res.render("download");
});

router.get("/images/:id.:ext", (req, res) => {
  const file = `${req.params.id}.${req.params.ext}`;
  const path = `./images/${file}`;
  const readStream = fs.createReadStream(path);
  const newFile = `${shortened}-converted.${req.query.convert}`;
  const newPath = `./converted/${newFile}`;
  const greyScaleFile = `${shortened}-greyscale.${req.params.ext}`;
  const greyscalePath = `./greyscale-converted/${greyScaleFile}`;
  const newReadStream = fs.createReadStream(newPath);
  let mimeType;

  // converting format function
  const ConvertFormat = async (file) => {
    try {
      await sharp(file).toFormat(req.query.convert).toFile(newPath);

      console.log("converted!, check the ./converted folder!");
    } catch (error) {
      console.log(error);
    }
  };

  // greyscale format function

  const GreyScale = async (file) => {
    try {
      await sharp(file).grayscale().toFile(`greyscale-converted/${shortened}-grey.png`);
      console.log("converted to greyscale, check the ./greyscale-converted folder!");
    } catch (error) {
      console.log(error);
    }
  };

  if (req.params.ext === "jpg" || req.params.ext === "jpeg") {
    mimeType = "image/jpeg";
    convertedType = "jpg";
  } else if (req.params.ext === "png") {
    mimeType = "image/png";
    convertedType = "png";
  } else if (req.params.ext === "svg") {
    mimeType = "image/svg+xml";
    convertedType = "svg";
  } else {
    res.status(400).send("Invalid file type!");
  }

  res.header("Content-Type", mimeType);
  let convertedFile = `./converted/${req.params.id}.${req.query.convert}`;

  if (fs.existsSync(convertedFile)) {
    //   download normal file, unchanged format
    ConvertFormat(path);
    res.setHeader("Content-Disposition", "attachment; filename=" + file);
    readStream.pipe(res);
    console.log("file is NOT converted, downloading.");
  } else {
    // create new file with convertedType
    ConvertFormat(path);
    // download new convertedType
    console.log(newFile);
    res.setHeader("Content-Disposition", "attachment; filename=" + newFile);
    newReadStream.pipe(res);
    res.download(newPath);
  }
  if (req.query.convert === "grey") {
    // grey scaling!
    GreyScale(path);
    console.log(greyscalePath);
    res.setHeader(
      "Content-Disposition",
      "attachment; filename=" + greyScaleFile
    );
    // fs.createReadStream(greyscalePath).pipe(res);
    // res.download(greyscalePath);
  }
});

module.exports = router;
