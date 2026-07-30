import express from "express";

import {
  createEmployee,
  deleteEmployee,
  getAllEmployees,
  updateEmployee,
} from "../controller/employeeController.js";

const employeeRouter = express.Router();
employeeRouter.post("/createEmployee", createEmployee);
employeeRouter.get("/getAllEmployees", getAllEmployees);
employeeRouter.put("/updateEmployee", updateEmployee);
employeeRouter.delete("/deleteEmployee", deleteEmployee);

export default employeeRouter;
