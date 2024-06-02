import { Router } from "express";
import {
  logOutUser,
  logInUser,
  registerUser,
  refreshAccessToken,
  getCurrentUser,
  updateUserCover,
} from "../controllers/user.contorller.js";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/register").post(
  upload.fields([
    { name: "avatar", maxCount: 1 },
    { name: "coverImage", maxCount: 1 },
  ]),
  registerUser
);

router.route("/login").post(logInUser);

//?secured routes
router.route("/logout").post(verifyJWT, logOutUser);
router.route("/refresh-token").post(refreshAccessToken);
router
  .route("/cover-image")
  .post(verifyJWT, upload().single("coverImage"), updateUserCover);

router.route("/user").post(verifyJWT, getCurrentUser);

export default router;
