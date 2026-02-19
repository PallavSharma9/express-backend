import express from "express";
import cookieParser from "cookie-parser";
import authRouter from "./routes/auth.route.js";
import musicRouter from "./routes/music.route.js";

const app = express();
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRouter);
app.use("/api/music", musicRouter);

export default app;
