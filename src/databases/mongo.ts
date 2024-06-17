import mongoose from "mongoose";

export const Mongo = {
  async connect() {
    console.log("Connecting to MongoDB");
    await mongoose.connect("mongodb://127.0.0.1:27017/Marketplace");
    console.log("Connected to MongoDB");
  },
};
