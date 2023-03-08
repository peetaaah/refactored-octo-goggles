const sharp = require('sharp')
const GreyScale = async () => {
    try {
      await sharp("images/xxxxxxx.png")
        .grayscale()
        .toFile("greyscale-converted/grey.png");
        console.log('did it hit here');
    } catch (error) {
      console.log(error);
    }
  }
  GreyScale()