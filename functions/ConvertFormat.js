const sharp = require("sharp");
const { uuid } = require("uuidv4");
const shortened = uuid().slice(0, 5);

async function ConvertFormat (file) {
  try {
    await sharp(file).toFormat(req.query.convert).toFile(newPath);
    console.log("converted!, check the ./converted folder!");
  } catch (error) {
    console.log(error);
  }
};
// this is where the base function lies