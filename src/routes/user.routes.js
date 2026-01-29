import { Router } from "express";
import { registerUser, loginUser, logoutUser, refreshAccessToken } from "../controllers/user.controllers.js";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

// Main route of register
const userRouter = Router();
userRouter.route("/register").post(
  upload.fields([
    {
      name: "avatar",
      maxCount: 2
    },
    {
      name: "coverImage",
      maxCount: 2
    }
  ]),
  registerUser)


// This is login route and takes to loginUser.
userRouter.route('/login').post(loginUser)

// This is logout route and takes to logoutUser but before that go through the verifyJWT middleware. Thats it this is how middlewares are placed in route before components.
userRouter.route("/logout").post(verifyJWT, logoutUser)

userRouter.route("/tokens").post(refreshAccessToken)

userRouter.route("/pass").post(changeCurrentUserPassword)

export default userRouter