import mongoose from "mongoose";
const Schema = mongoose.Schema;
//schema
const UserSchema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});
//model
const User = mongoose.model("User", UserSchema);

export default User;
