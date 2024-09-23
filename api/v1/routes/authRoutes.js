import { Router } from 'express';

import { validateUserDetails } from '../middlewares/validateUser.js';

import {
  registerUser,
  sendLinkToVerifyEmail,
  sendCodeToVerifyEmail,
  verifyEmailByLink,
  verifyEmailByCode,
} from '../controllers/authController.js';

const router = Router();

router.post('/register', validateUserDetails, registerUser);

router.post('/send-link-email-verification', sendLinkToVerifyEmail);
router.post('/send-code-email-verification', sendCodeToVerifyEmail);
router.get('/verify-email-by-link', verifyEmailByLink);
router.post('/verify-email-by-code', verifyEmailByCode);

export default router;
