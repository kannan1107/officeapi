import Employee from "../models/Employee.js";
import { uploadToCloudinary } from "../config/cloudinary.js";

// creater the employee details

export const createEmployee = async (req, res) => {
  try {
    const data = { ...req.body };
    if (req.file) data.photo = await uploadToCloudinary(req.file.buffer);
    const employee = await Employee.create(data);
    res.status(201).json({ success: true, employee });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// get all employee details
export const getAllEmployees = async (req, res) => {
  try {
    const employees = await Employee.find();

    res.status(200).json({
      success: true,
      employees,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getEmployeeById = async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);
    if (!employee)
      return res.status(404).json({ success: false, message: "employee not found" });
    res.status(200).json({ success: true, employee });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const data = { ...req.body };
    if (req.file) data.photo = await uploadToCloudinary(req.file.buffer);
    const employee = await Employee.findByIdAndUpdate(id, data, { returnDocument: 'after', runValidators: false });
    if (!employee)
      return res.status(404).json({ success: false, message: "employee not found" });
    res.status(200).json({ success: true, employee });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const employee = await Employee.findByIdAndDelete(id);
    if (!employee)
      return res.status(404).json({ success: false, message: "employee not found" });
    res.status(200).json({ success: true, message: "employee deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
