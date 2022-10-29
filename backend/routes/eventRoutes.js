import express from "express";
const eventRouter = express.Router();
import * as eventController from "../controllers/eventController.js";
import bodyParser from "body-parser";
eventRouter.use(bodyParser.json());
eventRouter.use(bodyParser.urlencoded({ extended: false }));

eventRouter.post("/add", eventController.createEvent);

//eventRouter.post("/list", eventController.listEvents);

export default eventRouter;
