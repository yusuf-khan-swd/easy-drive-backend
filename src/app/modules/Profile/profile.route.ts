import express from 'express';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { USER_ROLE } from '../User/user.constant';
import { ProfileController } from './profile.controller';
import { ProfileValidation } from './profile.validation';

const router = express.Router();

router.get(
  '/:id',
  auth(USER_ROLE.user, USER_ROLE.admin),
  ProfileController.getUserProfile,
);

router.patch(
  '/:id',
  auth(USER_ROLE.user, USER_ROLE.admin),
  validateRequest(ProfileValidation.profileUpdateValidationSchema),
  ProfileController.updateUserProfile,
);

export const ProfileRoutes = router;
