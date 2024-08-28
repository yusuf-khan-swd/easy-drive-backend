import httpStatus from 'http-status';
import { JwtPayload } from 'jsonwebtoken';
import AppError from '../../errors/AppError';
import { CAR_STATUS } from '../Car/car.constant';
import { Car } from '../Car/car.model';
import { User } from '../User/user.model';
import { TUserBooking } from './booking.interface';
import { Booking } from './booking.model';

const createBooking = async (payload: TUserBooking, user: JwtPayload) => {
  const { email } = user;
  const { carId, date, startTime } = payload;

  const isUserExist = await User.findOne({ email: email });

  if (!isUserExist) throw new AppError(httpStatus.NOT_FOUND, 'User not found');

  const isCarExist = await Car.findById(carId);

  if (!isCarExist) throw new AppError(httpStatus.NOT_FOUND, 'Car not found');

  const updatedCar = await Car.findByIdAndUpdate(
    isCarExist._id,
    {
      status: CAR_STATUS.unavailable,
    },
    { new: true },
  );

  const booking = {
    date,
    startTime,
    user: isUserExist,
    car: updatedCar,
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

  const result = await Booking.find({ car: carId, date: date })
    .populate('user')
    .populate('car');
  return result;
};

const myBooking = async (user: JwtPayload) => {
  const { email } = user;

  const isUserExist = await User.findOne({ email: email });

  if (!isUserExist)
    throw new AppError(httpStatus.NOT_FOUND, 'User does not exist');

  const result = await Booking.find({ user: isUserExist._id })
    .populate('user')
    .populate('car');

  return result;
};

const deleteMyBooking = async (user: JwtPayload, id: string) => {
  const { email } = user;

  const isUserExist = await User.findOne({ email: email });

  if (!isUserExist)
    throw new AppError(httpStatus.NOT_FOUND, 'User does not exist');

  const booking: any = await Booking.findById(id).populate('user');

  const bookingUserEmail = booking?.user?.email as string;

  if (bookingUserEmail !== email)
    throw new AppError(httpStatus.FORBIDDEN, 'Unauthorized Booking Delete.');

  const result = await Booking.findByIdAndUpdate(
    id,
    { isDeleted: true },
    { new: true },
  );

  return result;
};

export const BookingService = {
  createBooking,
  getAllBooking,
  myBooking,
  deleteMyBooking,
};
