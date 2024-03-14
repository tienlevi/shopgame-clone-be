import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import UserModel from "../model/User.js";

dotenv.config();
export const Login = async (req, res) => {
  const { username, password } = req.body;
  const user = await UserModel.findOne({ username });

  try {
    if (!user) {
      return res.status(401).json({ error: "Invalid user" });
    }
    if (password !== user.password) {
      return res.status(401).json({ error: "Invalid password" });
    }

    const accessToken = jwt.sign(
      { username: user.username },
      process.env.JWT_ACCESS_SECRET,
      {
        expiresIn: "20s",
      }
    );
    const refreshToken = jwt.sign(
      { username: user.username },
      process.env.JWT_REFRESH_SECRET
    );
    user.refreshToken = refreshToken;
    await user.save();

    return res.status(200).json({
      username: username,
      password: password,
      accessToken,
      refreshToken,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const Register = async (req, res) => {
  try {
    const { username, email, password, tel } = req.body;
    const user = await UserModel.findOne({ username });
    if (user) {
      res.status(402).json("User already registered.");
    }
    if (password.length < 8) {
      res.status(400).json("Password must be at least 8 characters long");
    }
    const refreshToken = jwt.sign(
      { username: username },
      process.env.JWT_REFRESH_SECRET
    );
    const newUser = new UserModel({
      username,
      password,
      email,
      tel,
      refreshToken: refreshToken,
    });
    await newUser.save();
    console.log(newUser);
    res.status(200).json({ message: "User registered successfully" });
  } catch (err) {
    console.error("Error registering user", err);
    res.status(500).json({ message: "Internal server error" });
  }
};
