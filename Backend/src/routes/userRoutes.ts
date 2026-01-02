import express from 'express';
import { sendOtp, verifyOtp, register, getProfile , logout} from '../controllers/authController';
import { protect } from '../middleware/authMiddleware';

const router = express.Router();


router.post('/send-otp', sendOtp);
router.post('/verify-otp', verifyOtp);
router.post('/register', register);
router.post('/logout', logout);
router.get('/profile', protect, getProfile); 

export default router;