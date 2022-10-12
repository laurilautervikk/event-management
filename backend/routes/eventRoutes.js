import express from "express";
const eventRouter = express.Router();
import * as eventController from "../controllers/eventController.js";

eventRouter.get("/data", eventController.getData);

export default eventRouter;
