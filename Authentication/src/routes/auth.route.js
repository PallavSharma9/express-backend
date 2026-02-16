import express from "express";
import { registerUser } from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/register", registerUser);

router.get("/test", (req, res) => {
  console.log("Cookie: ", req.cookies);
  res.json({
    message: "Test route",
    cookies: req.cookies,
  });
});

export default router;
