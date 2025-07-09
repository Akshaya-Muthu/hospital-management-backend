import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";

// ✅ Update the path based on your folder casing: 'database' or 'Database'
import connectDB from "./database/dbConfig.js";

import authRoute from "./router/userRouter.js";
import messageRouter from "./router/messageRouter.js";
import appointmentRouter from "./router/appointmentRouter.js";
import { errorMiddleware } from "./middlewares/error.js";

// ✅ Load environment variables
dotenv.config();

// ✅ Initialize express app
const app = express();

// ✅ Connect to MongoDB
connectDB();

// ✅ Core Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// ✅ CORS Configuration
app.use(
  cors({
    origin: [process.env.FRONTEND_URL_ONE, process.env.FRONTEND_URL_TWO],
    methods: ["GET", "POST", "DELETE", "PUT"],
    credentials: true,
  })
);

// ✅ File Upload Middleware
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);

// ✅ Base Test Route
app.get("/", (req, res) => {
  res.status(200).send("✅ VitalPulse Hospital Management Backend is running.");
});

// ✅ API Routes
app.use("/api/auth", authRoute);
app.use("/api/v1/message", messageRouter);
app.use("/api/v1/appointment", appointmentRouter);

// ✅ Global Error Middleware
app.use(errorMiddleware);

// ✅ Start Server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`🚀 Server started on http://localhost:${PORT}`);
});
