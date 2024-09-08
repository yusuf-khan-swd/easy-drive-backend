import { Router } from 'express';
import { createOrderController } from './order.controller';

const router = Router();

// TODO:  Route to create an order. Using this route frontend will send order data
router.post('/create', createOrderController);

export const orderRoutes = router;
