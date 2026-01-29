import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

// Don't configure immediately, do it in the function
const uploadOnCloudinary = async (localPath) => {
  try {
    // Configure cloudinary here, right before upload
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });

    if (!localPath) return null;

    if (!fs.existsSync(localPath)) {
      console.error("File does not exist:", localPath);
      return null;
    }

    const response = await cloudinary.uploader.upload(localPath, {
      resource_type: "auto",
    });

    console.log("File uploaded successfully to Cloudinary:", response.url);
    fs.unlinkSync(localPath);

    return response;
  } catch (error) {
    console.error("Cloudinary upload error:", error.message);
    
    if (localPath && fs.existsSync(localPath)) {
      fs.unlinkSync(localPath);
    }
    
    return null;
  }
};

export { uploadOnCloudinary };