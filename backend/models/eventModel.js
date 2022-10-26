import mongoose from "mongoose";
const Schema = mongoose.Schema;
//schema
const EventSchema = new Schema({
  name: { type: String, required: true },
  location: { type: String, required: true },
  time: { type: Date, default: Date.now },
});
//model
const Event = mongoose.model("Event", EventSchema);

export default Event;
