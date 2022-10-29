import { Event } from "../dbConnection.js";

export async function createEvent(req, res) {
  try {
    const { title, image, location, time } = req.body;
    if (!image) {
      image =
        "https://img.freepik.com/free-vector/silhouettes-rock-concert_1048-4815.jpg";
    }
    if (title && location) {
      const event = {
        title: title,
        image: image,
        location: location,
        time: new Date(time),
        authorId: req.auth.id,
      };
      Event.create(event);
      res.status(201).send({ message: "Event created" });
    } else {
      res.status(411).send({ error: "One or more required fields empty" });
    }
  } catch (error) {
    res.status(500).send({ error: error });
  }
}

// export async function listEvents(req, res) {
//   try {
//     console.log("events displayed without token");
//     res.status(201).send({ message: "events displayed" });
//   } catch (error) {
//     res.status(500).send({ error: error });
//   }
// }
