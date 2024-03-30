const cloudinary = require("cloudinary");
const dotenv = require("dotenv");

dotenv.config({ path: "backend/config/config.env" });

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadFiles = async (file, folder) => {
  try {
    const result = await cloudinary.uploader.upload(file, {
      folder: folder,
    });
    console.log("Image uploaded successfully:", result.url);
    return result.url;
  } catch (error) {
    console.error("Error uploading image:", error);
    throw error;
  }
};
module.exports = uploadFiles;
