import express from 'express';
import AuthController from '../controllers/auth-controller';

const router = express.Router();

router.route("/").post(AuthController.register);

export default router;