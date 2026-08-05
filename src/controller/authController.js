import User from "../models/User.js";
import generateToken from "../utils/generateToken.js";
import sendMail from "../utils/sendMail.js";

export const register = async (req, res) => {
  const { name, email, role, phone, deportment } = req.body || {};

  if (!name || !email) {
    return res.status(400).json({
      status: "error",
      message: "Name and email are required",
    });
  }

  const user = await User.findOne({ email });
  if (user) {
    return res.status(400).json({
      status: "error",
      message: "User already exists",
    });
  }

  const validRoles = ["admin", "user", "viewer"];
  if (role && !validRoles.includes(role)) {
    return res.status(400).json({
      status: "error",
      message: "Role must be admin, user, manager, assManager ",
    });
  }

  // password hashing

  const newUser = await User.create({
    name,
    email,
    role: role || "user",
    phone,
    deportment,
  });

  await sendMail(
    email,
    "Welcome to Event Management System",
    `Hello ${name},\n\nYour account has been created successfully.\n\nYour login credentials are:\nEmail: ${email}\nphone: ${phone}\nPassword: ${plainPassword}\n\nPlease change your password after logging in for the first time.\n\nThank you!`,
  );

  const token = generateToken({ id: newUser._id, role: newUser.role });
  res.status(201).json({
    _id: newUser._id,
    name: newUser.name,
    email: newUser.email,
    phone: newUser.phone,
    role: newUser.role,
    deportment: newUser.deportment,
    status: "success",
    message: "User created successfully",
    token,
  });
};

export const login = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res
      .status(400)
      .json({ status: "error", message: "Email is required" });
  }

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res
        .status(400)
        .json({ status: "error", message: "No account found with this email" });
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpiry = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes

    user.otp = otp;
    user.otpExpiry = otpExpiry;
    await user.save({ validateBeforeSave: false });

    await sendMail(
      email,
      "Your Login OTP",
      `Hello ${user.name},\n\nYour OTP for login is: ${otp}\n\nThis OTP is valid for 5 minutes.\n\nIf you did not request this, please ignore.`,
    );

    res.status(200).json({
      status: "success",
      message: "OTP sent to your email",
      email,
    });
  } catch (error) {
    console.error("Login error:", error);
    res
      .status(500)
      .json({
        status: "error",
        message: error.message || "Internal server error",
      });
  }
};

export const verifyOtp = async (req, res) => {
  const { email, otp } = req.body;

  if (!email || !otp) {
    return res
      .status(400)
      .json({ status: "error", message: "Email and OTP are required" });
  }

  const user = await User.findOne({ email });

  if (!user || !user.otp || !user.otpExpiry) {
    return res
      .status(400)
      .json({ status: "error", message: "OTP not requested" });
  }

  if (user.otp !== otp) {
    return res.status(400).json({ status: "error", message: "Invalid OTP" });
  }

  if (user.otpExpiry < new Date()) {
    return res
      .status(400)
      .json({ status: "error", message: "OTP has expired" });
  }

  user.otp = undefined;
  user.otpExpiry = undefined;
  await user.save();

  const token = generateToken({
    id: user._id,
    role: user.role,
    deportment: user.deportment,
  });
  res.status(200).json({
    _id: user._id,
    name: user.name,
    email: user.email,
    phone: user.phone,
    role: user.role,
    deportment: user.deportment,
    status: "success",
    message: "Logged in successfully",
    token,
  });
};

export const getme = async (req, res) => {
  const user = await User.findById(req.user.id);
  res.status(200).json({
    status: "success",
    message: "User fetched successfully",
    data: user,
  });
};

export const logout = (req, res) => {
  res.status(200).json({
    status: "success",
    message: "User logged out successfully",
  });
};

export const update = async (req, res) => {
  const { name, email, password, role, phone } = req.body;
  const user = await User.findByIdAndUpdate(
    req.user.id,
    { name, email, password, role, phone, deportment },
    { new: true },
  );
  res.status(200).json({
    status: "success",
    message: "User updated successfully",
    data: user,
  });
};
