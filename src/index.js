import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import Connect from "./config/Connect.js";
import router from "./router/router.js";

const app = express();
const port = 5000;

// Connect
Connect();
dotenv.config();

// Middleware
app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "DELETE", "PUT", "OPTIONS"],
    credentials: true,
  })
);

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:5173");
  res.header("Access-Control-Allow-Credentials", true);
  next();
});

app.use("/api", router);

app.listen(port, () =>
  console.log(`Server is running on port http://localhost:${port}`)
);
