import express from 'express'
import { signUp } from '../controllers/signUpController.js';
const router = express.Router();

router.post('/signup', signUp);

export default router;
