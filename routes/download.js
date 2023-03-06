const express = require("express");
const fs = require("fs");
const path = import('path')

const router = express.Router();

router.get("/download", (req, res) => {
  res.render("download");
});

router.get("/Images/:id.:ext", (req, res) => {
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

module.exports = router;