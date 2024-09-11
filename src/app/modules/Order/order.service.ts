import httpStatus from 'http-status';
import { JwtPayload } from 'jsonwebtoken';
import AppError from '../../errors/AppError';
import { Booking } from '../Booking/booking.model';
import { Car } from '../Car/car.model';
import { initiatePayment } from '../Payment/payment.utils';
import { User } from '../User/user.model';
import { Order } from './order.model';

const createOrder = async (payload: any) => {
  const { user, car, booking, totalCost } = payload;

  const isUserExist = await User.findById(user);

  if (!isUserExist) throw new AppError(httpStatus.NOT_FOUND, 'User not found');

  const isCarExist = await Car.findById(car);

  if (!isCarExist) throw new AppError(httpStatus.NOT_FOUND, 'Car not found');

  const isBookingExist = await Booking.findById(booking);

  if (!isBookingExist)
    throw new AppError(httpStatus.NOT_FOUND, 'Booking not found');

  const transactionId = `TXN-${Date.now()}`;

  const orderData = {
    user,
    car,
    booking,
    totalCost,
    status: 'Pending',
    paymentStatus: 'Pending',
    transactionId,
  };

  const order = new Order(orderData);

  await order.save();

  const paymentData = {
    transactionId,
    totalCost,
    customerName: isUserExist?.name,
    customerEmail: isUserExist?.email,
    customerPhone: isUserExist?.phone,
    customerAddress: isUserExist?.address,
  };

  // Payment
  const paymentSession = await initiatePayment(paymentData);
  console.log({ paymentSession });

  return paymentSession;
};

const myOrders = async (user: JwtPayload) => {
  const { email } = user;

  const isUserExist = await User.findOne({ email: email });

  if (!isUserExist)
    throw new AppError(httpStatus.NOT_FOUND, 'User does not exist');

  const result = await Order.find({ user: isUserExist._id })
    .populate('booking')
    .populate('car');

  return result;
};

export const orderService = {
  createOrder,
  myOrders,
};
