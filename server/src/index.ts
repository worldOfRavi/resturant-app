import dotenv from "dotenv";
dotenv.config();  // Load environment variables first

import express, { Request, Response } from "express";
import appRouter from "./routes/index";
import connectDB from "./db/connectDB";

const app = express();
const PORT = 3000;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is listening at port ${PORT}`);
  });
});

app.use("/api", appRouter);
