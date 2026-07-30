import { Router } from "express";
import { createItem, getAllItems, getItemById, updateItem, deleteItem, stockIn, stockOut, getBalance, getHistory } from "../controller/itemController.js";
import { protect } from "../middleware/authmiddleware.js";
import { upload } from "../config/cloudinary.js";

const itemRouter = Router();

itemRouter.post("/", protect, upload.single("image"), createItem);
itemRouter.get("/", protect, getAllItems);
itemRouter.get("/:id", protect, getItemById);
itemRouter.put("/:id", protect, upload.single("image"), updateItem);
itemRouter.delete("/:id", protect, deleteItem);

itemRouter.post("/:id/in", protect, stockIn);
itemRouter.post("/:id/out", protect, stockOut);
itemRouter.get("/:id/balance", protect, getBalance);
itemRouter.get("/:id/history", protect, getHistory);

export default itemRouter;
