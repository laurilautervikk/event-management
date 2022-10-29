import mongoose from "mongoose";
const Schema = mongoose.Schema;

const EventSchema = new Schema({
  title: { type: String, required: true },
  image: { type: String, required: true },
  location: { type: String, required: true },
  time: { type: Date, default: Date.now },
  authorId: { type: String, required: true },
});

const Event = mongoose.model("Event", EventSchema);

export default Event;
