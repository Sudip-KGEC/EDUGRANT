import express from 'express';
import { chatWithAI } from '../controllers/aiController';

const router = express.Router();

//  handle chat messages
router.post('/chat', chatWithAI);

export default router;