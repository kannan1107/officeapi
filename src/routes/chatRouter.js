import { Router } from "express";
import multer from "multer";
import path from "path";
import { protect } from "../middleware/authmiddleware.js";
import { addMessage, deleteMessage, updateMessage, getConversation } from "../controller/chatController.js";

const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, "uploads/"),
    filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname)),
});
const upload = multer({ storage, limits: { fileSize: 10 * 1024 * 1024 } });

const chatRouter = Router();
chatRouter.post("/addMessage", protect, upload.single("file"), addMessage);
chatRouter.get("/getConversation/:sender/:receiver", protect, getConversation);
chatRouter.delete("/deleteMessage/:id", protect, deleteMessage);
chatRouter.put("/updateMessage/:id", protect, updateMessage);

export default chatRouter;

