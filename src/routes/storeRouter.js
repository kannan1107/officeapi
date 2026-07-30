import { Router } from "express";
import {
    createStore,
    getAllStores,
    getStoreById,
    updateStore,
    deleteStore,
    stockIn,
    stockOut,
    updatePlace,
    getBalance,
    getInAndOutHistory,
} from "../controller/storeController.js";
import { protect } from "../middleware/authmiddleware.js";

const storeRouter = Router();

storeRouter.post("/", protect, createStore);
storeRouter.get("/", protect, getAllStores);
storeRouter.get("/:id", protect, getStoreById);
storeRouter.put("/:id", protect, updateStore);
storeRouter.delete("/:id", protect, deleteStore);

storeRouter.get("/:id/balance", protect, getBalance);
storeRouter.post("/:id/in", protect, stockIn);
storeRouter.post("/:id/out", protect, stockOut);
storeRouter.put("/:id/place", protect, updatePlace);
storeRouter.get("/:id/history", protect, getInAndOutHistory);

export default storeRouter;
