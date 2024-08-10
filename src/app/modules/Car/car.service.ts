import httpStatus from 'http-status';
import QueryBuilder from '../../builder/QueryBuilder';
import AppError from '../../errors/AppError';
import { Booking } from '../Booking/booking.model';
import { CAR_STATUS } from './car.constant';
import { TCar, TReturnCar } from './car.interface';
import { Car } from './car.model';
import { calculateTotalCoast } from './car.utils';

const createCar = async (payload: TCar) => {
  const result = await Car.create(payload);
  return result;
};

const getAllCar = async (query: Record<string, unknown>) => {
  const carQuery = new QueryBuilder(Car.find({ isDeleted: false }), query)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await carQuery.modelQuery;
  return result;
};

const getSingleCars = async (id: string) => {
  const result = await Car.findById(id);

  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, 'Car not found');
  }

  return result;
};

const updateCar = async (id: string, payload: Partial<TCar>) => {
  const isCarExists = await Car.findById(id);

  if (!isCarExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'Car not found');
  }

  const result = await Car.findByIdAndUpdate(id, payload, {
    new: true,
  });

  return result;
};

const deleteCar = async (id: string) => {
  const isCarExists = await Car.findById(id);

  if (!isCarExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'Car not found');
  }

  const result = await Car.findByIdAndUpdate(id, { isDeleted: true });

  return result;
};

const returnCar = async (payload: TReturnCar) => {
  const { bookingId, endTime } = payload;

  const isBookingExists = await Booking.findById({ _id: bookingId });

  if (!isBookingExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'Booking not found');
  }

  const isCarExist = await Car.findById(isBookingExists.car);

  if (!isCarExist) throw new AppError(httpStatus.NOT_FOUND, 'Car not found');

  await Car.findByIdAndUpdate(isCarExist._id, { status: CAR_STATUS.available });

  const startTime = isBookingExists.startTime;
  const pricePerHour = isCarExist.pricePerHour;

  const totalCost = calculateTotalCoast(startTime, endTime, pricePerHour);

  const result = await Booking.findByIdAndUpdate(
    { _id: bookingId },
    { endTime, totalCost },
    { new: true },
  )
    .populate('user')
    .populate('car');

  return result;
};

export const CarService = {
  createCar,
  getAllCar,
  getSingleCars,
  updateCar,
  deleteCar,
  returnCar,
};
