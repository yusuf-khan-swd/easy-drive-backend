import httpStatus from 'http-status';
import { JwtPayload } from 'jsonwebtoken';
import AppError from '../../errors/AppError';
import { Car } from '../Car/car.model';
import { User } from '../User/user.model';
import { TUserBooking } from './booking.interface';
import { Booking } from './booking.model';

const createBooking = async (payload: TUserBooking, user: JwtPayload) => {
  const { userEmail } = user;
  const { carId, date, startTime } = payload;

  const isUserExist = await User.findOne({ email: userEmail });

  if (!isUserExist) throw new AppError(httpStatus.NOT_FOUND, 'User not found');

  const isCarExist = await Car.findById(carId);

  if (!isCarExist) throw new AppError(httpStatus.NOT_FOUND, 'Car not found');

  const booking = {
    date,
    startTime,
    user: isUserExist,
    car: isCarExist,
  };

  const result = await Booking.create(booking);
  return result;
};

const getAllBooking = async (query: Record<string, unknown>) => {
  const { carId, date } = query;

  if (!carId || !date)
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'Please Provide carId and date in parameter',
    );

  const result = await Booking.find({ car: carId, date: date });
  return result;
};

const myBooking = async (id: string) => {
  const isBookingExists = await Booking.findById(id);

  if (!isBookingExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'Booking not found');
  }

  const result = await Booking.findByIdAndUpdate(id, { isDeleted: true });

  return result;
};

export const BookingService = {
  createBooking,
  getAllBooking,
  myBooking,
};
