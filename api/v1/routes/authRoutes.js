import { Router } from 'express';

import { validateUserDetails } from '../middlewares/validateUser.js';

import { registerUser } from '../controllers/authController.js';

const router = Router();

router.post('/register', validateUserDetails, registerUser);

export default router;
