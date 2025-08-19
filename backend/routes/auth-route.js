import express from "express";
import { signin, signUp } from "../controllers/auth-controller.js";

const router =express.Router();


router.post("/sign-up",signUp);
router.post("/sign-in",signin);

export default router;
