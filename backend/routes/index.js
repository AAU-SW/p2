import express from 'express'
import { signup_post } from '../controllers/signinController.js';
const router = express.Router();

/* GET sign up page. */
router.post('/signup', signup_post);
export default router;



