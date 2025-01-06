import mongoose from "mongoose";

const connectDb = async () => {
  try {
    const conn = await mongoose.connect("mongodb+srv://connecthashimkm:12345@cluster0.ulzzh.mongodb.net/data");
    console.log(`mongoose connected ${conn.connection.host}`);
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
};

export default connectDb;
