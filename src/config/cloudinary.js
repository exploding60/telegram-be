const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.PHOTO_CLOUD_NAME,
  api_key: process.env.PHOTO_KEY,
  api_secret: process.env.PHOTO_SECRET,
});

module.exports = cloudinary;
