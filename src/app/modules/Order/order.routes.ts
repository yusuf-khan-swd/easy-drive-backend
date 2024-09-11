import { Router } from 'express';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../User/user.constant';
import { OrderController } from './order.controller';

const router = Router();

// TODO:  Route to create an order. Using this route frontend will send order data
router.post('/create', auth(USER_ROLE.user), OrderController.createOrder);

export const orderRoutes = router;
