import mongoose from "mongoose";

export async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      dbName: "userAuth",
    });

    console.log("MongoDb connected");
  } catch (err) {
    console.log("Database connection error:", err);
  }
}
