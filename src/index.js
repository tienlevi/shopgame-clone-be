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
app.use(cors());
app.use(
  cors({
    origin: ["https://shopgame-clone.vercel.app", "http://localhost:3000"],
    methods: ["GET", "POST", "OPTIONS"],
    credentials: true,
  })
);
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", [
    "https://shopgame-clone.vercel.app",
    "http://localhost:3000",
  ]);
  app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
  });
  next();
});
app.use(cookieParser());

AuthController(app);
UserController(app);

app.listen(port, () => console.log(`localhost is http://localhost:${port}`));