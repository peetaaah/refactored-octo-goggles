const express = require("express");
const fs = require("fs");
const sharp = require("sharp");

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

router.get("/images/:id.:ext", (req, res) => {
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

module.exports = router;
