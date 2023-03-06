const express = require('express');
const multer = require('multer');
const { uuid } = require("uuidv4");

const router = express.Router();

const storage = multer.diskStorage({
  destination: "./Images",
  filename: (req, file, callback) => {
    console.log(file);
    callback(null, uuid().slice(0, 7) + path.extname(file.originalname));
    // note, i used a slice here to reduce the overall length of the uuid.
    // its just to make it look cleaner, but we can remove it easy.
  },
});


const upload = multer({ storage });


router.get('/upload', (req, res) => {
  res.render('upload');
});

// post
router.post('/upload', upload.single('image'), (req, res) => {
  res.render('uploaded');
});

module.exports = router;