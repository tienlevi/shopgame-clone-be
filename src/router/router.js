import express from "express";
import { AccessToken, RefreshToken } from "../controllers/AuthController.js";
import { Login, Register } from "../controllers/FormController.js";

const router = express.Router();

router.post("/refresh", RefreshToken);

router.post("/login", Login);
router.post("/user", AccessToken);
router.post("/signup", Register);
export default router;
