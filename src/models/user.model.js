import mongoose, {Schema} from "mongoose";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"

const userSchema = new Schema(
  {
    username:
    {
      type: String,
      required: true,
      lowercase: true,
      index: true,
      trim: true,
      unique: true
    },
    email:
    {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
      unique: true
    },
    fullname:
    {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
      index: true
    },
    avatar:
    {
      type: String,  //cloudinary url
      required: true,
    },
    coverImage:
    {
      type: String,
      default: ""
    },
    watchHistory:[
      {
        type: Schema.Types.ObjectId,
        ref: "Video"
      }
    ],
    password:
    {
      type: String,
      required: [true,"Password Required"]
    },
    refreshToken:
    {
      type: String
    }
  },
  {timestamps: true}
)

//.pre is used to perform operations before something here before save. so when before save it checks if password is modified, if yes then only again hash it. If not then dont waste time and just return 
userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;
  this.password = await bcrypt.hash(this.password, 10);
});

//.methods allows us to create new methods on existing schema here we made a isPasswordCorrect method which has asynch function which has a argument password from login page (called in user component). This password is compared with the bcrypt password stored in the database and returns true or false. 
// bcrypt first unhashes and then compares.
userSchema.methods
.isPasswordCorrect = async function(password){
  return await bcrypt.compare(password, this.password)
}


// This are used to generate tokens using jwt.sign / It takes object as data.
userSchema.methods.generateAccessToken = function(){
  return jwt.sign(
    {
      _id: this._id,
      email: this.email,
      username: this.username,
      fullname: this.fullname
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY
    }
)
}
userSchema.methods.generateRefreshToken = function(){
  return jwt.sign(
    {
      _id: this._id,
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRY
    }
)
}

export const User = mongoose.model("User", userSchema)