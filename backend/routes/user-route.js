import express from 'express';
import { verify_token } from '../middleware/verify-user';

const router =express.Router();

router.post("/update/id:",verify_token,updateUser);


export default router;