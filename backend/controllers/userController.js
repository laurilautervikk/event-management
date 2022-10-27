import { User } from "../dbConnection.js";
import bcrypt from "bcryptjs";

export async function createUser(req, res) {
  try {
    //validate inputs
    const { email, password } = req.body;
    const re = /\S+@\S+\.\S+/;
    if (re.test(email) && password.length > 4) {
      //check if user exists
      const getUser = await User.findOne({ email: email });
      if (!getUser) {
        //register user
        let createUser = new User({
          email: email,
          password: bcrypt.hashSync(password, 10),
        });
        await User.create(createUser);
        //add user to session
        res.status(201).send({ message: "User created" });
      } else {
        res.status(403).send({ error: "User already exists" });
        //route to login or reset password
      }
    } else {
      res.status(406).send({ error: "Email or password not acceptable" });
    }
  } catch (error) {
    res.status(500).send({ error: error });
  }
}
