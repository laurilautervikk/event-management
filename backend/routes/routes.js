import express from "express";
const router = express.Router();
import * as controller from "../controllers/controller.js";
import bodyParser from "body-parser";
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));

router.post("/users", controller.createUser);

router.post("/sessions", controller.loginUser);

router.post("/events", controller.createEvent);

router.get("/events", controller.listEvents);

router.get("/events/own", controller.listmyEvents);

router.put("/events", controller.editEvent);

//NA
//router.patch("/events/:id", controller.editEvent);

router.delete("/events/:id", controller.deleteEvent);

export default router;
