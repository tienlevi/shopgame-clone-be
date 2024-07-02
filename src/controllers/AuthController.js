import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import UserModel from "../model/User.js";

dotenv.config();
export const RefreshToken = async (req, res) => {
  const { refreshToken } = req.body;
  try {
    if (!refreshToken) {
      return res.status(401).json({ error: "Invalid refresh token" });
    }
    jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET, (err, user) => {
      err && console.log(err);

      const accessToken = jwt.sign(
        { email: user.email },
        process.env.JWT_ACCESS_SECRET
      );

      return res.status(200).json({
        accessToken,
        refreshToken,
      });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const AccessToken = async (req, res) => {
  const { email } = req.user;

  try {
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(403).json({ error: "User not found" });
    }
    return res.status(200).json({ user });
  } catch (error) {
    console.error(error);
    return res.status(401).json({ error: "Unauthorized" });
  }
};

export const getUserById = async (req, res) => {
  try {
    const user = await UserModel.findById(req.params.id);
    return res.status(200).json(user);
  } catch (error) {
    console.log(error);
  }
};
