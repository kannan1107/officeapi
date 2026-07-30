import { Router } from "express";
import {
  createDoto,
  getAllDoto,
  getDotoById,
  updateDoto,
  deleteDoto,
  getDotoByUserId,
  getDotoByCategory,
  getDotoByStatus,
  getDotoByUserIdAndCategory,
  getDotoByUserIdAndStatus,
  getDotoByCategoryAndStatus,
  getDotoByUserIdAndCategoryAndStatus,
  getDotoBySearch,
  getDotoByUserIdAndSearch,
  updateDotoReview,
  getDotoReview,
} from "../controller/dotoController.js";

const dotoRouter = Router();

dotoRouter.post("/createDoto", createDoto);
dotoRouter.get("/getAllDoto", getAllDoto);
dotoRouter.get("/getDotoById/:id", getDotoById);
dotoRouter.put("/updateDoto/:id", updateDoto);
dotoRouter.delete("/deleteDoto/:id", deleteDoto);
dotoRouter.get("/getDotoByUserId/:userId", getDotoByUserId);
dotoRouter.get("/getDotoByCategory/:category", getDotoByCategory);
dotoRouter.get("/getDotoByStatus/:status", getDotoByStatus);

// create doto
dotoRouter.post("/createDoto", createDoto);

// get all DOto
dotoRouter.get("/getAllDoto", getAllDoto);
dotoRouter.get(
  "/getDotoByUserIdAndCategory/:userId/:category",
  getDotoByUserIdAndCategory,
);
dotoRouter.get(
  "/getDotoByUserIdAndStatus/:userId/:status",
  getDotoByUserIdAndStatus,
);
dotoRouter.get(
  "/getDotoByCategoryAndStatus/:category/:status",
  getDotoByCategoryAndStatus,
);
dotoRouter.get(
  "/getDotoByUserIdAndCategoryAndStatus/:userId/:category/:status",
  getDotoByUserIdAndCategoryAndStatus,
);
dotoRouter.get("/getDotoBySearch/:search", getDotoBySearch);
dotoRouter.get(
  "/getDotoByUserIdAndSearch/:userId/:search",
  getDotoByUserIdAndSearch,
);
dotoRouter.put("/updateDotoReview/:id", updateDotoReview);
dotoRouter.get("/getDotoReview/:id", getDotoReview);

export default dotoRouter;
