import express from "express";
import multer from "multer";
import {
  createEmployee,
  deleteEmployee,
  getAllEmployees,
  getEmployeeById,
  updateEmployee,
} from "../controller/employeeController.js";

const upload = multer({ storage: multer.memoryStorage() });

const employeeRouter = express.Router();

employeeRouter.post("/createEmployee", upload.single("photo"), createEmployee);
employeeRouter.get("/getAllEmployees", getAllEmployees);
employeeRouter.get("/getEmployee/:id", getEmployeeById);
employeeRouter.put("/updateEmployee/:id", upload.single("photo"), updateEmployee);
employeeRouter.delete("/deleteEmployee/:id", deleteEmployee);

export default employeeRouter;
