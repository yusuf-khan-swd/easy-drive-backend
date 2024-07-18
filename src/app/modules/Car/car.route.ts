import express from 'express';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { USER_ROLE } from '../User/user.constant';
import { CarController } from './car.controller';
import { CarValidation } from './car.validation';

const router = express.Router();

router.post(
  '/',
  auth(USER_ROLE.admin),
  validateRequest(CarValidation.createCarValidationSchema),
  CarController.createCar,
);

router.get('/', CarController.getAllCars);

router.get('/:id', CarController.getSingleCar);

router.put(
  '/:id',
  auth(USER_ROLE.admin),
  validateRequest(CarValidation.updateCarValidationSchema),
  CarController.updateCar,
);

router.delete('/:id', CarController.deleteCar);

// TODO: I think I have to move this route to before dynamic put route
router.put(
  '/return',
  validateRequest(CarValidation.returnCarValidationSchema),
  CarController.returnCar,
);

export const CarRoutes = router;
