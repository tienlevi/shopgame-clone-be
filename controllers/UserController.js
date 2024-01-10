import AuthenticateToken from "./AuthenticateToken.js";
import UserModel from "../model/User.js";

function UserController(app) {
  app.get("/user", AuthenticateToken, async (req, res) => {
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
}

export default UserController;
