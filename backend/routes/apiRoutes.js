import express from "express";
const apiRouter = express.Router();
import * as apiController from "../controllers/apiController.js";

//API routes
apiRouter.get("/data", apiController.getData);

export default apiRouter;
