const cloudinary = require("cloudinary").v2;

cloudinary.config({
    cloud_name: process.env.CLOUDNARY_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET,
    secure: true,
});

const uploadImage = async (image, id) => {
    const result = await cloudinary.uploader.upload(image, {
        public_id: `/photo/${id}`,
        folder: "kundi",
        overwrite: true,
    });

    return result;
};

const deleteImage = async (id) => {
    const result = await cloudinary.uploader.destroy(`/photo/${id}`);
    return result;
};



module.exports = {uploadImage, deleteImage}
