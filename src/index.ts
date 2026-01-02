import express from "express";
import mongoose from "mongoose";
import morgan from "morgan";
import cors from "cors";
import cookieParser from "cookie-parser";
import userRoutes from "./routes/user-routes.js";
import chatRoutes from "./routes/chat-routes.js";
import { config } from "dotenv";

config();

const app = express();

// Middlewares
app.use(
  cors({ 
    origin: (origin, callback) => callback(null, true), // Dynamic Origin: Har port ko allow karega
    credentials: true 
  })
);

app.use(express.json());
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(morgan("dev"));

// Routes
app.use("/api/user/", userRoutes);
app.use("/api/chat/", chatRoutes);

// MongoDB connection
mongoose
  .connect(process.env.MONGODB_URI!)
  .then(() => {
    app.listen(process.env.PORT || 5000, () => {
      console.log(`Server started on port ${process.env.PORT || 5000} and MongoDB is connected`);
    });
  })
  .catch((err) => {
    console.log("MongoDB connection error:", err);
  });