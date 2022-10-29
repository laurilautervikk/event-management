import { Event } from "../dbConnection.js";
import moment from "moment";

export async function createEvent(req, res) {
  try {
    const { title, image, location, time } = req.body;
    if (title && image && location) {
      const event = {
        title: title,
        image: image,
        location: location,
        time: new Date(time),
        authorId: req.auth.id,
      };
      await Event.create(event);
      res.status(201).send({ message: "Event created" });
    } else {
      res.status(411).send({ error: "One or more required fields empty" });
    }
  } catch (error) {
    res.status(500).send({ error: error });
  }
}

export async function listEvents(req, res) {
  try {
    const list = await Event.find();
    res.status(200).send(list);
  } catch (error) {
    res.status(500).send({ error: error });
  }
}

export async function listmyEvents(req, res) {
  try {
    const list = await Event.find({ authorId: req.auth.id });
    res.status(200).send(list);
  } catch (error) {
    res.status(500).send({ error: error });
  }
}

export async function editEvent(req, res) {
  try {
    const { title, image, location, time } = req.body;
    const isTimeValid = moment(time, moment.ISO_8601, true).isValid();
    if (title && image && location && isTimeValid) {
      let updatedEvent = await Event.findOneAndUpdate(
        { _id: req.params.id },
        {
          $set: {
            title: title,
            image: image,
            location: location,
            time: new Date(time),
            authorId: req.auth.id,
          },
        },
        { sort: { _id: 1 }, new: true }
      );
      res.status(200).send(updatedEvent);
    } else {
      res
        .status(400)
        .send({ error: "One or more required fields empty or malformed" });
    }
  } catch (error) {
    res.status(500).send({ error: error });
  }
}
