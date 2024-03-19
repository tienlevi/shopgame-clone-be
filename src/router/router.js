import express from "express";
import UserModel from "../model/User.js";
import { RefreshToken } from "../controllers/AuthController.js";
import { Login, Register } from "../controllers/FormController.js";
import AuthenticateToken from "../middleware/AuthenticateToken.js";

const router = express.Router();

router.post("/refresh", RefreshToken);

router.post("/login", Login);
router.get("/user", AuthenticateToken, async (req, res) => {
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
});
router.post("/signup", Register);
export default router;
