import express from 'express';
import { verify_token } from '../middleware/verify-user.js';
import { updateUser,updatePassword } from '../controllers/user-controller.js';
import upload from "../middleware/upload-middleware.js";

const router =express.Router();

router.post("/update/:id",verify_token,upload.single("profileImage"),updateUser);
router.post("/update/password/:id",verify_token,updatePassword);

export default router;
