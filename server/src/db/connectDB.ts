import mongoose from "mongoose";
// Check if DATABASE_URI is defined
const DATABASE_URI = process.env.DATABASE_URI;
if (!DATABASE_URI) {
  console.error("DATABASE_URI is missing! Check your .env file.");
  process.exit(1);
}

const connectDB = async () => {
  try {
    await mongoose.connect(DATABASE_URI);
    console.log("Database connection successful");
  } catch (error) {
    console.error("Database connection failed:", error);
    process.exit(1);
  }
};

export default connectDB