import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

// Configuration
cloudinary.config({
    cloud_name: "dhnjwkjnz",
    api_key: "995384264439534",
    api_secret: "uOcyC17KConI6dLz5PMcMaegMZI",
});

const uploadOnCloudinary = async (localFiilePath) => {
    try {
        if (!localFiilePath) return null;
        //upload on cloudinary
        const response = await cloudinary.uploader.upload(localFiilePath, {
            resource_type: "auto",
        });
        console.log("🖼 uploaded !", response.url);
        return response;
    } catch (error) {
        // fs.unlinkSync(localFiilePath); //?   will remove th localy saved file
        return null;
    }
};

export { uploadOnCloudinary };
