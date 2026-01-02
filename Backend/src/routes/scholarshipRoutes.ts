import express from 'express';
import { getScholarships, addScholarship , applyToScholarship} from '../controllers/scholarshipController';
import { protect } from '../middleware/authMiddleware';

const router = express.Router();

router.route('/')
  .get(getScholarships)  
  .post(addScholarship); 

router.post('/apply', protect ,applyToScholarship);

export default router;