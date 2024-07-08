const cloudinary = require("cloudinary");
const dotenv = require("dotenv");

dotenv.config({ path: "backend/config/config.env" });

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// const uploadFiles = async (file, folder) => {
//   try {
//     const result = await cloudinary.uploader.upload(file, folder);
//     console.log("Image uploaded successfully:", result.url);
//     return result.url;
//   } catch (error) {
//     console.error("Error uploading image:", error);
//     throw error;
//   }
// };
// const uploadFiles = async (file, folder) => {
//   return new Promise((resolve, reject) => {
//     cloudinary.uploader.upload_stream(
//       { folder },
//       (error, result) => {
//         if (error) return reject(error);
//         resolve(result.secure_url);
//       }
//     ).end(file.buffer);
//   });
// };
const uploadFiles = async (file,folder) => {
  const res = await cloudinary.uploader.upload(file, {
    resource_type: "auto",
    folder:folder,
  });
  return res;
}
module.exports = uploadFiles;
