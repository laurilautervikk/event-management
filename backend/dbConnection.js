import mongoose from "mongoose";
import User from "./models/userModel.js";
import Event from "./models/eventModel.js";
import dotenv from "dotenv";
dotenv.config();

mongoose.connect(process.env.MONGO_URI).then(() => {
  console.log("connected to database");
});

export { User, Event };
