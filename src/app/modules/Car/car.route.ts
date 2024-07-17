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

// TODO: I think I have to move this route to before dynamic put route
router.put(
  '/cars/return',
  validateRequest(CarValidation.returnCarValidationSchema),
  CarController.returnCar,
);

export const CarRoutes = router;
