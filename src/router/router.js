import express from "express";
import UserModel from "../model/User.js";
import { AccessToken, RefreshToken } from "../controllers/AuthController.js";
import { Login, SignUp } from "../controllers/FormController.js";
import AuthenticateToken from "../middleware/AuthenticateToken.js";
import { createOrder, getOrderByUserId } from "../controllers/Orders.js";

const router = express.Router();

router.post("/refresh", RefreshToken);

router.post("/login", Login);
router.get("/user", AuthenticateToken, AccessToken);
router.post("/signup", SignUp);

router.post("/orders", createOrder);
router.get("/orders", getOrderByUserId);
export default router;
