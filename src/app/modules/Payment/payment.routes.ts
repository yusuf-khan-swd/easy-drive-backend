import { Router } from 'express';
import { PaymentController } from './payment.controller';

const router = Router();

// TODO: this /confirmation route will interact with initiatePayment() success or fail payment fallback url
// TODO: Also change fallback url to frontend page see this can implement

router.post('/confirmation', PaymentController.confirmation);

// TODO: Send post request from frontend to this route to verify payment
// router.post('/verify-payment')

export const paymentRoutes = router;
