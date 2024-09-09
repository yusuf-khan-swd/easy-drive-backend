import express from 'express';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { USER_ROLE } from './user.constant';
import { UserController } from './user.controller';
import { UserValidation } from './user.validation';

const router = express.Router();

router.post(
  '/admin',
  auth(USER_ROLE.admin),
  validateRequest(UserValidation.userValidationSchema),
  UserController.createAdmin,
);

router.put(
  '/:id',
  auth(USER_ROLE.admin),
  validateRequest(UserValidation.userUpdateValidationSchema),
  UserController.updateUser,
);

router.get('/', auth(USER_ROLE.admin), UserController.getAllUsers);
router.delete('/:id', auth(USER_ROLE.admin), UserController.deleteUser);

export const UserRoutes = router;
