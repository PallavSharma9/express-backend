import express from "express";
import { registerUser } from "../controllers/auth.controller.js";

const authRouter = express.Router();

authRouter.post("/register", registerUser);

authRouter.get("/test", (req, res) => {
  console.log("Cookie: ", req.cookies);
  res.json({
    message: "Test route",
    cookies: req.cookies,
  });
});

export default authRouter;
