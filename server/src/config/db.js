import mongoose from "mongoose";

export const connectDatabase = async () => {
  try {
    if (!process.env.MONGODB_URI) {
      throw new Error("MONGODB_URI is not configured.");
    }

    const connection = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`MongoDB connected: ${connection.connection.host}`);
  } catch (error) {
    console.error("Database connection failed:", error.message);
    throw error;
  }
};
