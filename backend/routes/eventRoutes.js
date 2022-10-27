import express from "express";
const eventRouter = express.Router();
import * as eventController from "../controllers/eventController.js";
import bodyParser from "body-parser";
eventRouter.use(bodyParser.json());
eventRouter.use(bodyParser.urlencoded({ extended: false }));

eventRouter.get("/data", eventController.getData);

export default eventRouter;
