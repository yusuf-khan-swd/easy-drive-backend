import express from 'express';
import { BookingController } from './booking.controller';

const router = express.Router();

router.post(
  '/',
  // validateRequest(BookingValidation.createBookingValidationSchema),
  BookingController.createBooking,
);

router.get('/', BookingController.getAllBookings);

router.get('/:id', BookingController.getSingleBooking);

router.put(
  '/:id',
  // validateRequest(BookingValidation.updateBookingValidationSchema),
  BookingController.updateBooking,
);

router.delete('/:id', BookingController.deleteBooking);

export const BookingRoutes = router;
