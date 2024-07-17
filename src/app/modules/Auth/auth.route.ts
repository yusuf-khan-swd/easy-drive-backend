import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { UserValidation } from '../User/user.validation';
import { AuthController } from './auth.controller';
import { AuthValidation } from './auth.validation';

const router = express.Router();

router.post(
  '/signup',
  validateRequest(UserValidation.userValidationSchema),
  AuthController.signUp,
);

router.post(
  '/login',
  validateRequest(AuthValidation.loginValidationSchema),
  AuthController.loginUser,
);

export const AuthRoutes = router;
