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
// Connect
Connect();
dotenv.config();
// Middleware
app.use(morgan("dev"));
app.use(express.json());

const allowedOrigins = [
  "http://localhost:3000",
  "https://shopgame-clone.vercel.app",
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("CORS not allowed"));
      }
    },
    methods: ["GET", "POST", "OPTIONS"],
    credentials: true,
  })
);
// app.use(
//   cors({
//     origin: ["http://localhost:3000", "https://shopgame-clone.vercel.app"],
//     methods: ["GET", "POST", "OPTIONS"],
//     credentials: true,
//   })
// );

// app.use((req, res, next) => {
//   res.header("Access-Control-Allow-Origin", [
//     "http://localhost:3000",
//     "https://shopgame-clone.vercel.app",
//   ]);
//   res.header("Access-Control-Allow-Credentials", true);
//   next();
// });

app.use(cookieParser());
AuthController(app);
UserController(app);

app.listen(port, () => console.log(`localhost is http://localhost:${port}`));
