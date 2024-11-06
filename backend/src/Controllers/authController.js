import { User } from "../models/user.model.js";
import httpStatus from "http-status";
import bcrypt, { hash } from "bcrypt";
import crypto from "crypto";

const login = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: "Please Enter all fields" });
  }

  try {
    const user = await User.findOne({ username });
    if (!user) {
      res.status(httpStatus.NOT_FOUND).json({ message: "User Do Not Exist" });
    }

    if (!bcrypt.compare(password, user.password)) {
      res
        .status(httpStatus.NOT_ACCEPTABLE)
        .json({ message: "Password Incorrect" });
    }

    let token = crypto.randomBytes(20).toString("hex");

    user.token = token;
    await user.save();

    res
      .status(httpStatus.OK)
      .json({ message: "User SignedIn Successfully", token: token });
  } catch (error) {
    res.json({ message: "Error While Signin User" + error });
  }
};

const register = async (req, res) => {
  const { name, username, password } = req.body;

  try {
    const existingUser = await User.findOne({ username });

    if (existingUser) {
      return res
        .status(httpStatus.FOUND)
        .json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      username,
      password: hashedPassword,
    });

    await newUser.save();

    res
      .status(httpStatus.CREATED)
      .json({ message: "User Registered Successfully" });
  } catch (error) {
    res.json({ message: "Error While Registering User" + error });
  }
};

export { login, register };
