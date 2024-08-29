import express from 'express';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { USER_ROLE } from '../User/user.constant';
import { BookingController } from './booking.controller';
import { BookingValidation } from './booking.validation';

const router = express.Router();

router.post(
  '/',
  auth(USER_ROLE.user),
  validateRequest(BookingValidation.bookingValidationSchema),
  BookingController.createBooking,
);

router.get('/', auth(USER_ROLE.admin), BookingController.getAllBookings);
router.get(
  '/car-date',
  auth(USER_ROLE.admin),
  BookingController.getAllBookingByCarAndDate,
);

router.get('/my-bookings', auth(USER_ROLE.user), BookingController.myBooking);
router.delete(
  '/my-bookings/:id',
  auth(USER_ROLE.user),
  BookingController.deleteMyBooking,
);
router.delete('/:id', auth(USER_ROLE.admin), BookingController.deleteBooking);

export const BookingRoutes = router;
