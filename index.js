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
    origin: "https://shopgame-clone.vercel.app",
    methods: ["GET", "POST", "OPTIONS"],
    credentials: true,
  })
);
app.use((req, res, next) => {
  res.setHeader(
    "Access-Control-Allow-Origin",
    "https://shopgame-clone.vercel.app"
  );
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});
app.use(cookieParser());

AuthController(app);
UserController(app);

app.listen(port, () => console.log(`localhost is http://localhost:${port}`));
