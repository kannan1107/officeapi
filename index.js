import express from "express";
import dotenv from "dotenv";
import fs from "fs";
import multer from "multer";
import connectDB from "./src/config/db.js";
import errorHandler from "./src/middleware/errorHendler.js";
import authRouter from "./src/routes/authRoutes.js";
import userRoutes from "./src/routes/userRouter.js";
import cors from "cors";
import { Socket } from "socket.io";
import chatRouter from "./src/routes/chatRouter.js";
import dotoRouter from "./src/routes/dotoRouter.js";
import itemRouter from "./src/routes/itemRouter.js";
import storeRouter from "./src/routes/storeRouter.js";
import employeeRouter from "./src/routes/employeeRouter.js";

dotenv.config();
const app = express();

app.use(cors());

if (!fs.existsSync("uploads")) {
  fs.mkdirSync("uploads");
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});

const upload = multer({ storage });

// Static files and upload middleware
app.use("/uploads", express.static("uploads"));
app.use(
  "/api/events",
  upload.fields([
    { name: "image" },
    { name: "video" },
    { name: "guestPhotos", maxCount: 10 },
  ]),
);

app.use(express.json());

app.use("/api/auth", authRouter);
app.use("/api/users", userRoutes);
app.use("/api/chat", chatRouter);
app.use("/api/doto", dotoRouter);
app.use("/api/items", itemRouter);
app.use("/api/stores", storeRouter);
app.use("/api/employees", employeeRouter);
// Socket.io logic

app.use(errorHandler);
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  connectDB();
});

console.log("Connected to DB");
