import express from "express";
import { googlesignin, signin, signUp } from "../controllers/auth-controller.js";

const router =express.Router();


router.post("/sign-up",signUp);
router.post("/sign-in",signin);

router.post("/google-sign-in",googlesignin);

export default router;
