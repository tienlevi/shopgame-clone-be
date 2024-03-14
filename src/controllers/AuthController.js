import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import UserModel from "../model/User.js";
import AuthenticateToken from "./AuthenticateToken.js";

dotenv.config();
export const RefreshToken = async (req, res) => {
  const { refreshToken } = req.body;
  try {
    const user = await UserModel.findOne({ refreshToken });
    if (!user) {
      return res.status(401).json({ error: "Invalid refresh token" });
    }
    const accessToken = jwt.sign(
      { username: user.username },
      process.env.JWT_ACCESS_SECRET
    );
    return res.status(200).json({ accessToken: accessToken });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const AccessToken = async (req, res) => {
  const { username } = req.user;

  try {
    const user = await UserModel.findOne({ username });
    if (!user) {
      return res.status(403).json({ error: "User not found" });
    }
    return res.status(200).json({ user });
  } catch (error) {
    console.error(error);
    return res.status(401).json({ error: "Unauthorized" });
  }
};
