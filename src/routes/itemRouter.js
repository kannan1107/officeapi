import { Router } from "express";

import {
  createItem,
  getAllItems,
  getItemById,
  updateItem,
  deleteItem,
  stockIn,
  stockOut,
  getBalance,
  getHistory,
} from "../controller/itemController.js";

import { protect } from "../middleware/authmiddleware.js";
import { upload } from "../config/cloudinary.js";

const itemRouter = Router();

const itemUpload = upload.fields([
  { name: "images", maxCount: 10 },
  { name: "certificate", maxCount: 1 },
]);

// Create item
itemRouter.post("/", protect, itemUpload, createItem);

// Get all items
itemRouter.get("/", protect, getAllItems);

// Get balance
itemRouter.get("/:id/balance", protect, getBalance);

// Get history
itemRouter.get("/:id/history", protect, getHistory);

// Stock in
itemRouter.post("/:id/in", protect, stockIn);

// Stock out
itemRouter.post("/:id/out", protect, stockOut);

// Get item
itemRouter.get("/:id", protect, getItemById);

// Update item
itemRouter.put("/:id", protect, itemUpload, updateItem);

// Delete item
itemRouter.delete("/:id", protect, deleteItem);

export default itemRouter;
