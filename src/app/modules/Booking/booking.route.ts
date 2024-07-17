import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { BookingController } from './booking.controller';
import { BookingValidation } from './booking.validation';

const router = express.Router();

router.post(
  '/',
  validateRequest(BookingValidation.bookingValidationSchema),
  BookingController.createBooking,
);

router.get('/', BookingController.getAllBookings);

router.get('/my-bookings', BookingController.myBooking);

router.get('/:id', BookingController.getSingleBooking);

export const BookingRoutes = router;
