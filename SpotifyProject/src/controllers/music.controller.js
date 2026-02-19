import musicModel from "../models/music.model.js";
import jwt from "jsonwebtoken";
import { uploadFile } from "../services/storage.service.js";

async function addMusic(req, res) {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({
      message: "No token provided",
    });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

    if (decoded.role !== "artist") {
      return res.status(403).json({
        message: "Only artists can add music",
      });
    }

    const { title } = req.body;
    const file = req.file;
    const result = await uploadFile(file);

    const music = await musicModel.create({
      url: result,
      title,
      artist: decoded.id,
    });

    res.status(201).json({
      message: "Music added successfully",
      music: {
        id: music._id,
        title: music.title,
        url: music.url,
        artist: music.artist,
      },
    });
  } catch (error) {
    console.log("JWT Error: ", error.message);
    return res.status(401).json({
      message: "Unauthorized",
      error: error.message,
    });
  }
}

export { addMusic };
