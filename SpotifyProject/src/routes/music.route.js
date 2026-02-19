import express from "express";
import { addMusic } from "../controllers/music.controller.js";
import multer from "multer";

const upload = multer({
  storage: multer.memoryStorage(),
});

const musicRouter = express.Router();

musicRouter.post("/upload", upload.single("music"), addMusic);

export default musicRouter;
