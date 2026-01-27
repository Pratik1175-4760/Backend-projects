import { v2 as cloudinary } from 'cloudinary';
import fs from "fs"


cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const uploadOnCloudinary = async (localpath)=>{
  try {
    if(!localpath) return console.log("Not found");
    const response = await cloudinary.uploader.upload(localpath,{
      resource_type: "auto"
    })
    //file has been uploaded successfully
    console.log("Uploaded on Cloudinary: ", response.url)
    return response
  } catch (error) {
    fs.unlinkSync(localpath) // remove the locally saved temporary file on cloudinary when upload failed
  }
}

export {uploadOnCloudinary}