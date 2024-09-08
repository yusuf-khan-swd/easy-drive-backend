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

router.get('/my-bookings', auth(USER_ROLE.user), BookingController.myBookings);

router.get('/', auth(USER_ROLE.admin), BookingController.getAllBookings);

router.get(
  '/car-date',
  auth(USER_ROLE.admin),
  BookingController.getAllBookingByCarAndDate,
);

// TODO: Can add getUserSingleBooking
router.get(
  '/:id',
  auth(USER_ROLE.user, USER_ROLE.admin),
  BookingController.getSingleBooking,
);

router.delete(
  '/my-bookings/:id',
  auth(USER_ROLE.user),
  BookingController.deleteMyBooking,
);

// TODO: Can add updateUserBooking
router.put(
  '/:id',
  auth(USER_ROLE.user, USER_ROLE.admin),
  validateRequest(BookingValidation.updateBookingValidationSchema),
  BookingController.updateBooking,
);

router.delete('/:id', auth(USER_ROLE.admin), BookingController.deleteBooking);

export const BookingRoutes = router;
