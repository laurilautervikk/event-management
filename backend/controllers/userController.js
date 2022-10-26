import { User } from "../dbConnection.js";

export async function createUser(req, res) {
  // try {
  //   console.log("body: ", req.body.email);
  //   let createUser = new User({
  //     email: req.body.email,
  //     password: req.body.password,
  //   });
  //   await User.create(createUser);
  //   res.status(200).send(createUser);
  // } catch (error) {
  //   res.status(500).send({ status: "User registration failed", error: error });
  // }
}

export async function getData(req, res) {
  try {
    const data = { message: "OK" };
    res.status(200).send(data);
  } catch {
    res.status(404).send({ error: "No user found" });
  }
}
