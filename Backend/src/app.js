import express from "express";
import postModel from "./models/post.model.js";
import multer from "multer";
import { uploadFile } from "./services/storage.service.js";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());
const storage = multer.memoryStorage();

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, //5MB
});

app.post("/create-post", upload.single("image"), async (req, res) => {
  console.log(req.body);
  console.log(req.file);

  const result = await uploadFile(req.file);

  const post = await postModel.create({
    image: result.url,
    caption: req.body.caption,
  });

  return res.status(201).json({
    message: "Post created successfully",
    post,
  });
});

app.get("/posts", async (req, res) => {
  const posts = await postModel.find();
  return res.json({
    message: "posts fetched successfully",
    posts,
  });
});

export default app;
