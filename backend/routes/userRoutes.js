import express from "express";
const userRouter = express.Router();
import * as userController from "../controllers/userController.js";

userRouter.get("/data", userController.getData);

export default userRouter;
