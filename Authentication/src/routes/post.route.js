import express from "express";
import jwt from "jsonwebtoken";
import userModel from "../models/user.model.js";

const postRouter = express.Router();

postRouter.post("/create-post", async (req, res) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({
        message: "No token provided",
      });
    }

    const { title, content } = req.body;

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await userModel.findById(decoded.id);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    return res.status(201).json({
      message: "Post created successfully",
      post: {
        title,
        content,
        author: user.name,
      },
    });
  } catch (error) {
    console.log("JWT Error: ", error.message);

    return res.status(401).json({
      message: "Unauthorized",
      error: error.message,
    });
  }
});

export default postRouter;
