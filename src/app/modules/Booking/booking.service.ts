import httpStatus from 'http-status';
import QueryBuilder from '../../builder/QueryBuilder';
import AppError from '../../errors/AppError';
import { TBooking } from './booking.interface';
import { Booking } from './booking.model';

const createBooking = async (payload: TBooking) => {
  const result = await Booking.create(payload);
  return result;
};

const getAllBooking = async (query: Record<string, unknown>) => {
  const bookingQuery = new QueryBuilder(Booking.find(), query)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await bookingQuery.modelQuery;
  return result;
};

const getSingleBookings = async (id: string) => {
  const result = await Booking.findById(id);

  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, 'Booking not found');
  }

  return result;
};

const deleteBooking = async (id: string) => {
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
  getSingleBookings,

  deleteBooking,
};
