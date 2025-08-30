import express from "express";
import { googlesignin, signin, signUp ,signout } from "../controllers/auth-controller.js";

const router =express.Router();


router.post("/sign-up",signUp);
router.post("/sign-in",signin);
router.get("/signout",signout);

router.post("/google-sign-in",googlesignin);

export default router;
