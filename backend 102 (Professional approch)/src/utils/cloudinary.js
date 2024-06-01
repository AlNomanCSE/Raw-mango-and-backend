import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

cloudinary.config({
  cloud_name: "dhnjwkjnz",
  api_key: "995384264439534",
  api_secret: "uOcyC17KConI6dLz5PMcMaegMZI", // Click 'View Credentials' below to copy your API secret
});

const uploadOnCloudinary = async (localFiilePath) => {
  try {
    if (!localFiilePath) return null;
    //upload on cloudinary
    const response = await cloudinary.uploader.upload(localFiilePath, {
      resource_type: "auto",
    });
    //file has been upload successfull'
    // console.log("File is uploaded ..!", response.url);
    // fs.unlink(localFiilePath); //!having problem with this unlink code
    return response;
  } catch (error) {
    fs.unlinkSync(localFiilePath);
    return null;
  }
};

export { uploadOnCloudinary };
