import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/productDB");

    console.log("MongoDB Connected");
  } catch (err) {
    console.log(err.message);
    process.exit(1);
  }
};

export default connectDB;