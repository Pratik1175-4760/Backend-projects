import { Router } from "express";
import {
  registerUser,
  loginUser,
  logoutUser,
  refreshAccessToken,
  uploadUserAvatar,
  uploadUserCoverImage,
  changeCurrentUserPassword,
  getCurrentUserDetails,
  updateCurrentUserDetails,
  getUserChannelProfile,
} from "../controllers/user.controllers.js";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { use } from "react";

// Main route of register
const userRouter = Router();
userRouter.route("/register").post(
  upload.fields([
    {
      name: "avatar",
      maxCount: 2,
    },
    {
      name: "coverImage",
      maxCount: 2,
    },
  ]),
  registerUser
);

// This is login route and takes to loginUser.
userRouter.route("/login").post(loginUser);

// This is logout route and takes to logoutUser but before that go through the verifyJWT middleware. Thats it this is how middlewares are placed in route before components.
userRouter.route("/logout").post(verifyJWT, logoutUser);

userRouter.route("/tokens").post(refreshAccessToken);

userRouter.route("/pass").post(verifyJWT, changeCurrentUserPassword);

userRouter.route("/current_user").get(verifyJWT, getCurrentUserDetails);

userRouter.route("/update_account").patch(verifyJWT, updateCurrentUserDetails);

userRouter
  .route("/upload_avatar")
  .post(verifyJWT, upload.single("avatar"), uploadUserAvatar);

userRouter
  .route("/upload_cover")
  .post(verifyJWT, upload.single("coverImage"), uploadUserCoverImage);

userRouter.route("/c/:username").get(verifyJWT, getUserChannelProfile);

userRouter.route("/history").get(verifyJWT, getWatchHistory);

export default userRouter;
