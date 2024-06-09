import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { User } from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/Cloudinary.js";
const registerUser = asyncHandler(async (req, res) => {
    //get user details from client
    //validation filed details -not empty
    //check user is valid or not :username,mile
    //check for images, cheack for avatar
    //upload image and avatar cloudinary ,avatar
    //create user object -create entry in db
    //remove password and refrsh token field form response
    //checking user created or not
    //return response

    //*------get user details from client-------//
    const { fullName, userName, email, password } = req.body;

    //*------validation filed details -not empty-------//
    if (
        [fullName, userName, email, password].some(
            (field) => field?.tirm() === ""
        )
    ) {
        throw new ApiError(400, "All fields are required");
    }
    //*------check user is valid or not :username,mile-------//
    const existedUser = await User.findOne({
        $or: [{ userName }, { email }],
    });
    if (existedUser)
        throw new ApiError(409, "User with email or username already exist");
    //^---------check for images, cheack for avatar------------//
    const avaatrLocalPath = req.fiels?.avatar[0]?.path;
    const coverImageLocalPath = req.fiels?.coverImage[0]?.path;
    if (!avaatrLocalPath) throw new ApiError(400, "Avatar file is required");

    //*---------upload image and avatar cloudinary ,avatar------//
    const avatar = await uploadOnCloudinary(avaatrLocalPath);
    const coverImage = await uploadOnCloudinary(coverImageLocalPath);
    if (!avatar) throw new ApiError(400, "Avatar file is required");

    //&--------create User object -create entry in db------------//
    const newUser = await User.create({
        fullName,
        userName: userName.toLowerCase(),
        email,
        avatar: avatar.url,
        coverImage: coverImage?.url || "",
        password,
    });

    //& --------checking user created or not------//
    const createdUser = await User.findById(newUser._id).select(
        //& --------remove password and refrsh token field form response------//
        "-password -refreshToken"
    );
    if (!createdUser)
        throw new ApiError(500, "Something went wrong while creating user ⛔");

    //^-----------return response---------//
    return res
        .status(201)
        .json(
            new ApiResponse(200, createdUser, "User registered successfully 🙎‍♂️")
        );
});

export { registerUser };
