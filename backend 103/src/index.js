import "dotenv/config";
import connetBD from "./DB/index.js";
import { app } from "./app.js";
connetBD()
    .then(() => {
        app.listen(process.env.PORT || 8000, () => {
            console.log("Server Connected 🚀");
        });
    })
    .catch((error) => {
        console.log("Mongodb Connetion failed!📛", error);
    });
