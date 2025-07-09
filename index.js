import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";

import connectDB from "./Database/dbConfig.js";
import authRoute from "./router/userRouter.js";
import messageRouter from "./router/messageRouter.js";
import appointmentRouter from "./router/appointmentRouter.js";
import { errorMiddleware } from "./middlewares/error.js";

dotenv.config();

const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(
  cors({
    origin: [process.env.FRONTEND_URL_ONE, process.env.FRONTEND_URL_TWO],
    methods: ["GET", "POST", "DELETE", "PUT"],
    credentials: true,
  })
);

// File Upload Middleware
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);

// Connect Database
connectDB();

// Base Route
app.get("/", (req, res) => {
  res.status(200).send("Welcome to Hospital Management database backend");
});

// Routers
app.use("/api/auth", authRoute);
app.use("/api/v1/message", messageRouter);
app.use("/api/v1/appointment", appointmentRouter);

// Error Handler
app.use(errorMiddleware);

// Start Server
const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`✅ Server Started on port ${port}`);
});
