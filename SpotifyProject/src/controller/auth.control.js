import userModel from "../models/user.model";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

async function registerUser(req, res) {
  try {
    const { username, email, password, role = "user" } = req.body;
  
    if(!username || !email || !password) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

   const isUserAlreadyPresent = await userModel.findOne({
    $or: [{ email }, { username }],
   });

   if (isUserAlreadyPresent) {
    return res.status(409).json({
      message: "User already exists",
    });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

   const user = await userModel.create({
    username,
    email,
    password: hashedPassword,
    role,
   });

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "1d" },
    );

    res.cookie("token", token);

    res.status(201).json({
      message: "User registered successfully",
      token,
    });

  } catch (error) {
    console.log("Error creating user: ", error.message);

    res.status(500).json({
      message: "Error creating user",
      error: error,
    });
  }
}

async function loginUser(req, res) {

export { registerUser };
