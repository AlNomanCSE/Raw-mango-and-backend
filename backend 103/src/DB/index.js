import mongoose from "mongoose";
import { Database_Name } from "../constants.js";
async function connetBD() {
    try {
        const connectionInstance = await mongoose.connect(
            `${process.env.MONGODB_URL}/${Database_Name}`
        );
        console.log(
            "🔥MongoBD Connected! DB Host ✅:",
            connectionInstance.connection.host
        );
    } catch (error) {
        console.log("⛔MongoDB Connection error ⚠️: ", error);
        process.exit(1);
    }
}

export default connetBD;
