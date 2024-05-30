import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudinery.js";
import { ApiResponse } from "../utils/ApiResponse.js";
const registerUser = asyncHandler(async (req, res) => {
  //get user details
  //validation -not empty
  //check if user already exists : user name , email
  //cheack for image and avatar
  //upload them to cloudinary
  //create object for MngoDB -create entry in db
  //remove password and refresh token field from response
  //cheack for user creation
  //return response
  //!get user details
  const { fullName, username, email, password } = req.body; //data from -->from or json
  //!validation -not empty
  if (
    [fullName, username, email, password].some((field) => field?.trim() === "")
  ) {
    throw new ApiError(400, "All fields are required");
  }
  //!check if user already exists : user name , email
  const existedUser = User.findOne({ $or: [{ username }, { email }] });
  if (existedUser) {
    throw new ApiError(409, "User with email or username already exists");
  }
  //!cheack for image and avatar
  const avatarLocalPath = req.files?.avatar[0]?.path;
  const coverImageLocalPath = req.files?.coverImage[0]?.path;
  if (!avatarLocalPath) {
    throw new ApiError(400, "Avatar file is required");
  }

  //!upload them to cloudinary
  const avatarRef = await uploadOnCloudinary(avatarLocalPath);
  const coverImageRef = await uploadOnCloudinary(coverImageLocalPath);
  if (!avatarRef) {
    throw new ApiError(400, "Avatar file is required");
  }

  //!create object for MngoDB -create entry in db
  const user = await User.create({
    fullName,
    username: username.toLowercase,
    avatar: avatarRef.url,
    coverImage: coverImageRef?.url || "",
    email,
    password,
  });

  //!remove password and refresh token field from response
  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken" //? this will give me user without its password and refreshtoken
  );
  //!cheack for user creation
  if (!createdUser) {
    throw new ApiError(500, "Something went wrong while registering the user");
  }
  //return response
  return req
    .status(201)
    .json(new ApiResponse(200, createdUser, "User registerd Successfully"));
});

export { registerUser };
