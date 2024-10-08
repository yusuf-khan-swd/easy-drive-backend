import httpStatus from 'http-status';
import { JwtPayload } from 'jsonwebtoken';
import QueryBuilder from '../../builder/QueryBuilder';
import AppError from '../../errors/AppError';
import { CAR_STATUS } from '../Car/car.constant';
import { Car } from '../Car/car.model';
import { User } from '../User/user.model';
import { TBooking, TUserBooking } from './booking.interface';
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
  const carQuery = new QueryBuilder(
    Booking.find().populate('user').populate('car'),
    query,
  )
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await carQuery.modelQuery;
  return result;

  // const result = await Booking.find(query).populate('user').populate('car');
  // return result;
};

const getSingleBooking = async (id: string) => {
  const result = await Booking.findById(id).populate('user').populate('car');

  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, 'Booking not found');
  }

  return result;
};

const getAllBookingByCarAndDate = async (query: Record<string, unknown>) => {
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

const myBookings = async (user: JwtPayload) => {
  const { email } = user;

  const isUserExist = await User.findOne({ email: email });

  if (!isUserExist)
    throw new AppError(httpStatus.NOT_FOUND, 'User does not exist');

  const result = await Booking.find({ user: isUserExist._id })
    .populate('car')
    .sort('-createdAt');

  return result;
};

const updateBooking = async (id: string, payload: Partial<TBooking>) => {
  const isBookingExists = await Booking.findById(id);

  if (!isBookingExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'Booking not found');
  }

  const result = await Booking.findByIdAndUpdate(id, payload, {
    new: true,
  });

  return result;
};

const deleteMyBooking = async (user: JwtPayload, id: string) => {
  const { email } = user;

  const isUserExist = await User.findOne({ email: email });

  if (!isUserExist)
    throw new AppError(httpStatus.NOT_FOUND, 'User does not exist');

  const isBookingExists: any = await Booking.findById(id).populate('user');

  if (!isBookingExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'Booking not found');
  }

  const isCarExist = await Car.findById(isBookingExists.car);

  if (isCarExist) {
    await Car.findByIdAndUpdate(isCarExist._id, {
      status: CAR_STATUS.available,
    });
  }

  const bookingUserEmail = isBookingExists?.user?.email as string;

  if (bookingUserEmail !== email)
    throw new AppError(httpStatus.FORBIDDEN, 'Unauthorized Booking Delete.');

  const result = await Booking.findByIdAndDelete(id);

  return result;
};

const deleteBooking = async (id: string) => {
  const isBookingExists: any = await Booking.findById(id);

  if (!isBookingExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'Booking not found');
  }

  const isCarExist = await Car.findById(isBookingExists.car);

  if (isCarExist) {
    await Car.findByIdAndUpdate(isCarExist._id, {
      status: CAR_STATUS.available,
    });
  }

  const result = await Booking.findByIdAndDelete(id);

  return result;
};

export const BookingService = {
  createBooking,
  getAllBooking,
  getAllBookingByCarAndDate,
  myBookings,
  deleteMyBooking,
  deleteBooking,
  getSingleBooking,
  updateBooking,
};
