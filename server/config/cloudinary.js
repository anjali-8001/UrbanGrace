const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

// cloudinary.uploader.upload("path_to_your_image.jpg", function (error, result) {
//   if (error) {
//     console.error(error);
//   } else {
//     console.log(result);
//     // Use result.secure_url to access the public URL of the uploaded image
//   }
// });

module.exports = cloudinary;
