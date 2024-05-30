import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
const app = express();

//!---------configuratin everything -----------//

app.use(
  cors({
    origin: process.env.CORS_ORIGINE, //?-----------configure cors-----------------//
    credentials: true,
  })
);
////////?---------- middlwares ------------------//////
app.use(express.json({ limit: "16kb" })); //?-----------accepting json-----------------//
app.use(express.urlencoded({ extended: true, limit: "16kb" })); //?------------accepting url----------------//
app.use(express.static("public")); //?------------configure for static files-----------//
app.use(cookieParser()); //?------------configure for cookieParser-----------//

//!-------------routes import ---------------//

import userRouter from "./routes/user.routes.js";
app.use("/api/v1/users", userRouter); //?---------------declaring routes-------------//

export default app;
