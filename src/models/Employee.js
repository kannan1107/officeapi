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
    blod: {
      type: String,
      required: true,
    },
    dob: {
      type: Date,
      required: true,
    },
    gender: {
      type: String,
      required: true,
    },
    maritalstatus: {
      type: String,
      required: true,
    },
    adhar: {
      type: Number,
      required: true,
      unique: true,
    },
    pan: {
      type: String,
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
    image: {
      type: String,
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
    offaddress: {
      type: String,
      required: true,
    },
    company: {
      type: String,
      required: true,
    },
    redate: {
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
  },
  { timestamps: true },
);

const Employee = mongoose.model("Employee", EmployeeSchema);

export default Employee;
