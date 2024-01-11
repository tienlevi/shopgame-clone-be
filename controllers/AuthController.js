import dotenv from "dotenv";
import UserModel from "../model/User.js";
import jwt from "jsonwebtoken";

dotenv.config();
function AuthController(app) {
  app.post("/refresh", async (req, res) => {
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
      // res.cookie("accessToken",accessToken)
      return res.status(200).json({ accessToken: accessToken });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  app.post("/login", async (req, res) => {
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
  });

  // app.post("/logout", (req, res) => {
  //   res.status(200).json({ message: "Logout successful" });
  // });

  app.post("/signup", async (req, res) => {
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
  });

  app.post("/changeinfor", async (req, res) => {
    const { _id, email } = req.body;
    try {
      const update = await UserModel.updateOne(
        { _id: "6547a33f4b8bf47926c70ee2" },
        { email: "tienyeujustinaxie@gmail.com" },
        { new: false },
        (err, response) => {
          console.log("Information change", response);
          if (err) console.log(err);
        }
      );
      // const update = await UserModel.findByIdAndUpdate(
      //   _id,
      //   {
      //     $set: { email: "tienyeujustinaxie@gmail.com" },
      //   },
      //   (err, response) => {
      //     console.log("Information change", response);
      //     if (err) console.log(err);
      //   }
      // );
      return res.status(200).json({ message: "Change success", update });
    } catch (err) {
      res.status(500).json({ message: "Internal server error" });
    }
  });
}

export default AuthController;
