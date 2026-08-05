import express from "express";
import multer from "multer";

import {
  createEmployee,
  deleteEmployee,
  getAllEmployees,
  updateEmployee,
} from "../controller/employeeController.js";

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});

const upload = multer({ storage });

const employeeRouter = express.Router();

employeeRouter.post("/createEmployee", upload.single("photo"), createEmployee);
employeeRouter.get("/getAllEmployees", getAllEmployees);
employeeRouter.put(
  "/updateEmployee/:${id}",
  upload.single("photo"),
  updateEmployee,
);
employeeRouter.delete("/deleteEmployee", deleteEmployee);
employeeRouter.delete("/deleteEmployee/:id", deleteEmployee);
employeeRouter.put("/updateEmployee/:id", updateEmployee);

export default employeeRouter;
