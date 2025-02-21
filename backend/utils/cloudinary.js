const cloudinary = require("cloudinary").v2;
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

//cloudinary upload image
const cloudinaryUploadImg = async (fileToUpload) => {
  try {
    const res = await cloudinary.uploader.upload(fileToUpload, {
      resource_type: "auto",
      folder: "users",
      public_id: `${Date.now()}`,
    })
    return res;
} catch (error) {
    console.log(error)
    throw new Error("Error uploading image to Cloudinary");
}
};

//cloudinary delete image
const cloudinaryDeleteImg = async (publicId) => {
  try {
    const res = await cloudinary.uploader.destroy(publicId);
    return res;
  } catch (error) {
    console.log(error)
    throw new Error("Error uploading image to Cloudinary");
  }
};
//delete all images from cloudinary
const cloudinaryDeleteAllImg = async (publicId) => {
  try {
    const res = await cloudinary.api.delete_resources (publicId); 
    return res
  } catch (error) {
    console.log(error)
    throw new Error("Error uploading image to Cloudinary");
  }
}

module.exports = {
  cloudinaryUploadImg,
  cloudinaryDeleteImg,
  cloudinaryDeleteAllImg
};
