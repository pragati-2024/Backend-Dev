//model -> controller -> routes -->server
//controller always contain logic
import express from 'express'
import { signup } from '../controllers/authController.js';
const router = express.Router();
router.post("/signup",signup)

export default router;