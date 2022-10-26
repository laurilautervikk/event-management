const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const userSchema = require("./userModel").schema;
//schema
const EventSchema = new Schema({
  name: { type: String, required: true },
  location: { type: String, required: true },
  time: { type: Date, default: Date.now },
  author: userSchema,
});
//model
const Event = mongoose.model("Event", EventSchema);

module.exports = Event;
