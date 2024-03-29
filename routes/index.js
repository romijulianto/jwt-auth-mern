import express from "express";
import {
    getUsers,
    Register,
    Login, 
    Logout
} from "../controllers/users.js";
import { verifyToken } from "../middleware/verify.token.js"
import { refreshToken } from "../controllers/refresh.token.js";

const router = express.Router();

router.get('/users', verifyToken, getUsers);
router.post('/users', Register);
router.post('/login', Login);
router.get('/token', refreshToken);
router.delete('/logout', Logout);

export default router;