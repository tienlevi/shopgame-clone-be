import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

function AuthenticateToken(req, res, next) {
  const authorizationHeader = req.headers["authorization"];
  const token = authorizationHeader && authorizationHeader.split(" ")[1];
  if (!token) {
    res.sendStatus(401);
  }
  jwt.verify(token, process.env.JWT_ACCESS_SECRET, (err, user) => {
    console.log(err);
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}

export default AuthenticateToken;
