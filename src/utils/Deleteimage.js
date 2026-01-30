import { v2 as cloudinary } from "cloudinary"

export const deleteImageByUrl = async (imageUrl) => {
  if (!imageUrl) return

  try {
    // Example URL:
    // https://res.cloudinary.com/demo/image/upload/v1690000000/avatars/user123.jpg

    const parts = imageUrl.split("/")
    const fileName = parts[parts.length - 1]        // user123.jpg
    const folder = parts[parts.length - 2]          // avatars
    const publicId = `${folder}/${fileName.split(".")[0]}`

    await cloudinary.uploader.destroy(publicId)
  } catch (error) {
    console.error("Failed to delete image:", error.message)
  }
}
