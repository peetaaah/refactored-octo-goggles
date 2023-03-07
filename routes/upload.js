const express = require('express');
const multer = require('multer');
const path = require("path");
const { uuid } = require("uuidv4");

const router = express.Router();

const storage = multer.diskStorage({
  destination: "./images",
  filename: (req, file, callback) => {
    console.log(file);
    callback(null, uuid().slice(0, 7) + path.extname(file.originalname));
    // note, i used a slice here to reduce the overall length of the uuid.
    // its just to make it look cleaner, but we can remove it easy.
  },
});


let fileFilter = function (req, file, cb) {
  console.log(file.mimetype);
  const allowedMimes = [
    "image/jpeg",
    "image/jpg",
    "image/png",
    "image/gif",
    "image/svg+xml",
  ];

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



router.get('/upload', (req, res) => {
  console.log()
  res.render('upload');
});

// post
router.post('/upload', upload, (req, res) => {
  console.log(req.file.filename)
  console.log(res.statusCode)
  res.render('uploaded');
});

module.exports = router;