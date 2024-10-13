import AdminUserModel from "../Model/User.model.js";
import crypto from "crypto";

export const getUsers = async (req, res) => {
  try {
    const users = await AdminUserModel.find();
    if (!users) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "User received successfully", users });
  } catch (err) {
    throw err;
  }
};

export const createUser = async (req, res) => {
  try {
    const { name, email, phoneCode, phone, role } = req.body;

    const existingUser = await AdminUserModel.findOne({ email });
    if (existingUser) {
      const error = new Error(`User with email ${email} already exists`);
      error.statusCode = 409;
      throw error;
    }

    const tempPassword = crypto.randomBytes(8).toString("hex");
    console.log(tempPassword);
    const newAdminUser = new AdminUserModel({
      name,
      email,
      password: tempPassword,
      phoneCode,
      phone,
      role,
      isVerified: true,
    });

    await newAdminUser.save();
    res.status(201).json({ message: `User ${name} created successfully` });
  } catch (err) {
    res.status(500).json(err);
  }
};
