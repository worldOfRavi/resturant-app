"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
// Check if DATABASE_URI is defined
const DATABASE_URI = process.env.DATABASE_URI;
if (!DATABASE_URI) {
    console.error("DATABASE_URI is missing! Check your .env file.");
    process.exit(1);
}
const connectDB = async () => {
    try {
        await mongoose_1.default.connect(DATABASE_URI);
        console.log("Database connection successful");
    }
    catch (error) {
        console.error("Database connection failed:", error);
        process.exit(1);
    }
};
exports.default = connectDB;
