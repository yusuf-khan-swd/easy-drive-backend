import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { CarController } from './car.controller';
import { CarValidation } from './car.validation';

const router = express.Router();

router.post(
  '/',
  validateRequest(CarValidation.createCarValidationSchema),
  CarController.createCar,
);

router.get('/', CarController.getAllCars);

router.get('/:id', CarController.getSingleCar);

router.put(
  '/:id',
  validateRequest(CarValidation.updateCarValidationSchema),
  CarController.updateCar,
);

router.delete('/:id', CarController.deleteCar);

export const CarRoutes = router;
