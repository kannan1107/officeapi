import mongoose, { model, Schema } from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 4,
      maxlength: 50,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      minlength: 4,
      maxlength: 50,
    },

    phone: {
      type: Number,
      trim: true,
    },
    role: {
      type: String,
      enum: ["admin", "user", "manager", "assManager"],
      default: "user",
    },

    deportment: {
      type: String,
      enum: [
        "admin",
        "quality",
        "technical",
        "GST",
        "security",
        "projecting",
        "developing",
        "hr",
        "driver",
        "store",
      ],
    },
    branch: {
      type: String,
      trim: true,
      default: "",
    },
    salary: {
      type: Number,
    },
    kinnumber: {
      type: Number,
      unique: true,
    },
    address: {
      type: String,
    },
    fathername: {
      type: String,
    },
    mothername: {
      type: String,
    },
    bloodgroup: {
      type: String,
    },
    dateofbirth: {
      type: Date,
    },

    gender: {
      type: String,
    },
    adharnumber: {
      type: Number,
      unique: true,
    },
    currentaddress: {
      type: String,
    },
    comemail: {
      type: String,
    },
    joiningdate: {
      type: Date,
    },
    id: {
      type: String,
    },
    proof: {
      type: String,
    },
    officeaddress: {
      type: String,
    },
    company: {
      type: String,
    },
    retirement: {
      type: Date,
    },
    avsec: {
      type: String,
    },
    avsecdate: {
      type: Date,
    },
    avsecexp: {
      type: Date,
    },
    avsecplace: {
      type: String,
    },
    course: {
      type: String,
    },

    coursedate: {
      type: Date,
    },

    courseexp: {
      type: Date,
    },
    passno: {
      type: String,
    },

    passexp: {
      type: Date,
    },
    photo: {
      type: String,
    },
    courseplace: {
      type: String,
    },
    el: {
      type: Number,
    },
    cl: {
      type: Number,
    },
    sl: {
      type: Number,
    },
    comfoff: {
      type: Number,
    },
    leaves: [
      {
        type: { type: String },
        from: { type: Date },
        to: { type: Date },
        reason: { type: String },
        status: { type: String, default: "pending" },
        createdAt: { type: Date, default: Date.now },
      },
    ],
    status: {
      type: String,
      default: "active",
    },

    otp: { type: String },
    otpExpiry: { type: Date },
  },
  {
    timestamps: true,
  },
);
userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

const User = model("User", userSchema);

export default User;
