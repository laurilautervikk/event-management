import { User, Event } from "../dbConnection.js";
import moment from "moment";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
const SECRET = process.env.JWT_SECRET;

export async function createUser(req, res) {
  try {
    const { email, password } = req.body;
    const re = /\S+@\S+\.\S+/;
    if (re.test(email) && password.length > 4) {
      const user = await User.findOne({ email: email });
      if (!user) {
        let createUser = new User({
          email: email,
          password: bcrypt.hashSync(password, 10),
        });
        await User.create(createUser);
        res.status(201).send({ message: "User created" });
      } else {
        res.status(403).send({ error: "User already exists" });
      }
    } else {
      res.status(406).send({ error: "Email or password not acceptable" });
    }
  } catch (error) {
    res.status(500).send({ error: error });
  }
}

export async function loginUser(req, res) {
  try {
    const { email, password } = req.body;
    if (email && password) {
      const user = await User.findOne({ email: email });
      if (user) {
        const isPasswordvalid = bcrypt.compare(password, user.password);
        if (isPasswordvalid) {
          const token = jwt.sign({ id: user._id }, SECRET, {
            expiresIn: "24h",
          });
          console.log("User logged in, token sent");
          res.status(200).send({ message: "Bearer " + token });
        } else {
          res.status(401).send({ error: "Wrong password" });
        }
      } else {
        res.status(404).send({ error: "User does not exist" });
      }
    } else {
      res.status(411).send({ error: "Email or password field empty" });
    }
  } catch (error) {
    res.status(500).send({ error: error });
  }
}

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
      const result = await Event.create(event);
      res.status(201).send(result);
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
    const { id, title, image, location, time } = req.body;
    const isTimeValid = moment(time, moment.ISO_8601, true).isValid();
    if (title && image && location && isTimeValid) {
      let updatedEvent = await Event.findOneAndUpdate(
        { _id: id },
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

export async function deleteEvent(req, res) {
  try {
    const result = await Event.deleteOne({ _id: req.params.id });
    if (result.deletedCount === 0) {
      res.status(404).send({ message: "Event not found" });
    } else {
      res.status(204).send({ message: "Event deleted" });
    }
  } catch (error) {
    res.status(500).send({ error: error });
  }
}
