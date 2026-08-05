import Employee from "../models/Employee.js";
import { uploadToCloudinary } from "../config/cloudinary.js";

// creater the employee details

export const createEmployee = async (req, res) => {
  console.log(req.body);
  console.log(req.file);

  try {
    const employee = await Employee.create({
      ...req.body,
      photo: req.file ? req.file.filename : null,
    });

    res.status(201).json(employee);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
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
    const employees = await employee.findById(req.params.id);
    if (!employees) {
      return res
        .status(404)
        .json({ success: false, message: "employee not found" });
    }
    res.status(200).json({ success: true, employees });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
export const updateEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const data = { ...req.body };
    delete data.inHistory;
    delete data.outHistory;
    if (req.file) data.photo = await uploadToCloudinary(req.file.buffer);
    const employees = await employee.findByIdAndUpdate(id, data, { new: true });
    if (!employees) {
      return res
        .status(404)
        .json({ success: false, message: "employee not found" });
    }
    res.status(200).json({ success: true, employees });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
export const deleteEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const employees = await employee.findByIdAndDelete(id);
    if (!employees) {
      return res
        .status(404)
        .json({ success: false, message: "employee not found" });
    }
    res
      .status(200)
      .json({ success: true, message: "employee deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
