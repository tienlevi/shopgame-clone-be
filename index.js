import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import Connect from "./model/Connect.js";
import AuthController from "./controllers/AuthController.js";
import UserController from "./controllers/UserController.js";

const app = express();
const port = 5000;
Connect();
dotenv.config();
app.use(morgan("dev"));
app.use(express.json());
app.use(
  cors({
    origin: "https://shopgame-clone-server.onrender.com",
    methods: ["GET", "POST"],
    credentials: true,
  })
);
app.use((req, res, next) => {
  res.setHeader(
    "Access-Control-Allow-Origin",
    "https://shopgame-clone-server.onrender.com"
  );
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});
app.use(cookieParser());

AuthController(app);
UserController(app);

app.listen(port, () => console.log(`localhost is http://localhost:${port}`));
