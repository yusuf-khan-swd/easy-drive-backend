import { initiatePayment } from '../Payment/payment.utils';
import Order from './order.model';

const createOrder = async (orderData: any) => {
  const { user, car, totalCost } = orderData;

  const transactionId = `TXN-${Date.now()}`;

  const order = new Order({
    user,
    car,
    totalCost,
    status: 'Pending',
    paymentStatus: 'Pending',
    transactionId,
  });

  await order.save();

  const paymentData = {
    transactionId,
    totalCost,
    customerName: user?.name,
    customerEmail: user?.email,
    customerPhone: user?.phone,
    customerAddress: user?.address,
  };

  // Payment
  const paymentSession = await initiatePayment(paymentData);
  console.log({ paymentSession });

  return paymentSession;
};

export const orderService = {
  createOrder,
};
