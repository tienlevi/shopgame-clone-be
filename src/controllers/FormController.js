import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import Joi from "joi";
import bcryptjs from "bcryptjs";
import UserModel from "../model/User.js";

dotenv.config();

const LoginSchema = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().required(),
});

const SignUpSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  tel: Joi.string().required(),
});

export const Login = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const { error } = LoginSchema.validate(req.body, { abortEarly: false });
    if (error) {
      const errors = error.details.map((err) => err.message);
      return res.status(400).json({ message: errors });
    }
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid Email" });
    }
    const isMatch = await bcryptjs.compare(password, user.password);
    if (!isMatch) {
      return res.status(402).json({ message: "password incorrect" });
    }
    const accessToken = jwt.sign(
      { email: user.email },
      process.env.JWT_ACCESS_SECRET,
      {
        expiresIn: "20s",
      }
    );
    const refreshToken = jwt.sign(
      { email: user.email },
      process.env.JWT_REFRESH_SECRET
    );

    return res.status(200).json({
      name: name,
      email: email,
      password: password,
      accessToken,
      refreshToken,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const SignUp = async (req, res) => {
  try {
    const { name, email, password, tel } = req.body;
    const { error } = SignUpSchema.validate(req.body, { abortEarly: false });
    if (error) {
      const errors = error.details.map((err) => err.message);
      return res.status(400).json({ message: errors });
    }
    const user = await UserModel.findOne({ email });
    if (user) {
      res.status(402).json("User already sign up.");
    }
    const refreshToken = jwt.sign(
      { name: name },
      process.env.JWT_REFRESH_SECRET
    );
    const hashedPassword = await bcryptjs.hash(password, 6);
    const data = new UserModel({
      name,
      password: hashedPassword,
      email,
      tel,
    });
    await data.save();
    console.log(data);
    res
      .status(200)
      .json({ message: "User registered successfully", data, refreshToken });
  } catch (err) {
    console.error("Error registering user", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const Logout = () => {};
