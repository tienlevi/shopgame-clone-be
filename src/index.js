import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import Connect from "./model/Connect.js";
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

app.use(cors());

app.use((req, res, next) => {
  res.header(
    "Access-Control-Allow-Origin",
    "https://shopgame-clone.vercel.app"
  );
  res.header("Access-Control-Allow-Credentials", true);
  next();
});

app.use("/api", router);

app.listen(port, () => console.log(`Server is running on port ${port}`));
