module.exports = {
  mongoURI: process.env.MONGO_URI,
  secretOrKey: process.env.SECRET_OR_KEY,
  cloudinaryKey: {
    cloud_name: process.env.CLOUDINARY_KEY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_KEY_API_KEY,
    api_secret: process.env.CLOUDINARY_KEY_API_SECRET,
  },
};
