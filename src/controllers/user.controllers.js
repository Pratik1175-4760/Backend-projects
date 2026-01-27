import { asyncHandler } from "../utils/asyncHandler.js";
import {ApiError} from "../utils/ApiError.js"
import { User } from "../models/user.model.js";
import {uploadOnCloudinary} from "../utils/cloudinary.js"
import { ApiResponse } from "../utils/ApiResponse.js";

export const registerUser = asyncHandler(async (req,res)=>{
  // get user details from frontend
  //validations - not empty
  //user already exists
  //check for images, checks for avatar
  //upload to cloudinary
  //create user object - create entry in db
  //remove password and refresh token field from response
  // return res

  const {fullname, email, username, password} = req.body

  const requiredFields = { fullname, email, username, password };

  for (const [key, value] of Object.entries(requiredFields)) {
  if (!value || typeof value !== "string" || value.trim() === "") {
    throw new ApiError(400, `${key} is required`);
  }
}

const existedUser = User.findOne({
  $or: [{email},{username}]
})
if(existedUser) throw new ApiError(409, "User with email or password already exist")

const avatarLocalPath = req.files?.avatar[0]?.path;

const coverImgLocalPath = req.files?.coverImage[0]?.path;

if(!avatarLocalPath)
{
  throw new ApiError(400, "Avatar is required");
}

const avatar = await uploadOnCloudinary(avatarLocalPath)
const coverImg = await uploadOnCloudinary(coverImgLocalPath)

if(!avatar)
{
  throw new ApiError(400, "Avatar is required");
}

const user = await User.create({
  fullname,
  avatar: avatar.url,
  coverImage: coverImg?.url || "",
  email,
  password,
  username: username.toLowerCase()
})
const createdUser = await User.findById(user._id).select(
  "-password -refreshToken"
)
if(!createdUser)
{
  throw new ApiError(500,"Something went wrong while registering user")
}

return res.status(201).json(
  new ApiResponse(200, createdUser,"User registered successfully")
)

})


