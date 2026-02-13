import mongoose from "mongoose";

export async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      dbName: "project-1",
    });

    console.log("MongoDB connected");
  } catch (err) {
    console.error("DB connection failed", err.message);
    process.exit(1);
  }
}
