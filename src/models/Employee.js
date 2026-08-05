import mongoose from "mongoose";

const EmployeeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    position: {
      type: String,
      required: true,
    },
    salary: {
      type: Number,
      required: true,
    },
    department: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    mobile: {
      type: Number,
      required: true,
      unique: true,
    },
    kinnumber: {
      type: Number,
      required: true,
      unique: true,
    },
    address: {
      type: String,
      required: true,
    },
    fathername: {
      type: String,
      required: true,
    },
    mothername: {
      type: String,
      required: true,
    },
    bloodgroup: {
      type: String,
      required: true,
    },
    dateofbirth: {
      type: Date,
      required: true,
    },
    gender: {
      type: String,
      required: true,
    },

    adharnumber: {
      type: Number,
      required: true,
      unique: true,
    },

    currentaddress: {
      type: String,
      required: true,
    },
    comemail: {
      type: String,
      required: true,
    },
    joiningdate: {
      type: Date,
      required: true,
    },

    id: {
      type: String,
      required: true,
    },
    proof: {
      type: String,
      required: true,
    },
    officeaddress: {
      type: String,
      required: true,
    },
    company: {
      type: String,
      required: true,
    },
    retirement: {
      type: Date,
      required: true,
    },
    avsec: {
      type: String,
      required: true,
    },
    avsecdate: {
      type: Date,
      required: true,
    },
    avsecexp: {
      type: Date,
      required: true,
    },
    avsecplace: { type: String, required: true },

    course: {
      type: String,
      required: true,
    },

    coursedate: {
      type: Date,
      required: true,
    },

    courseexp: {
      type: Date,
      required: true,
    },
    passno: {
      type: String,
      required: true,
    },

    passexp: {
      type: Date,
      required: true,
    },
    photo: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      default: "employee",
    },
    courseplace: { type: String, required: true },
    status: { type: String, default: "active" },
  },
  { timestamps: true },
);

const Employee = mongoose.model("Employee", EmployeeSchema);

export default Employee;
