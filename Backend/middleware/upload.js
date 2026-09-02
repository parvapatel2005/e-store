const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("cloudinary").v2;

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});
console.log(cloudinary.config());
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: "eStore",
        resource_type: "image"
    }
});

const upload = multer({
    storage
});

module.exports = upload;