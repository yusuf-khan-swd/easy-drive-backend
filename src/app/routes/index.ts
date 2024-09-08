import { Router } from 'express';
import { AuthRoutes } from '../modules/Auth/auth.route';
import { BookingRoutes } from '../modules/Booking/booking.route';
import { CarRoutes } from '../modules/Car/car.route';
import { ReviewRoutes } from '../modules/Review/review.route';
import { UserRoutes } from '../modules/User/user.route';

const router = Router();

const moduleRoutes = [
  {
    path: '/auth',
    route: AuthRoutes,
  },
  {
    path: '/cars',
    route: CarRoutes,
  },
  {
    path: '/reviews',
    route: ReviewRoutes,
  },
  {
    path: '/bookings',
    route: BookingRoutes,
  },
  {
    path: '/users',
    route: UserRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
