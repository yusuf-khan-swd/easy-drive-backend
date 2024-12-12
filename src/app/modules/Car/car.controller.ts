import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { CarService } from './car.service';

const createCar = catchAsync(async (req, res) => {
  const data = req.body;

  const result = await CarService.createCar(data);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Car Created Successfully',
    data: result,
  });
});

const getAllCars = catchAsync(async (req, res) => {
  const token = req.headers.authorization;
  console.log('token', token);

  const result = await CarService.getAllCar(req.query);

  if (result.length > 0) {
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Cars retrieved successfully',
      data: result,
    });
  } else {
    sendResponse(res, {
      statusCode: httpStatus.NOT_FOUND,
      success: true,
      message: 'No Data Found',
      data: result,
    });
  }
});

const getSingleCar = catchAsync(async (req, res) => {
  const token = req.headers.authorization;
  console.log('token', token);

  const { id } = req.params;
  const result = await CarService.getSingleCars(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'A Car retrieved successfully',
    data: result,
  });
});

const updateCar = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await CarService.updateCar(id, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Car updated successfully',
    data: result,
  });
});

const deleteCar = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await CarService.deleteCar(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Car Deleted successfully',
    data: result,
  });
});

const returnCar = catchAsync(async (req, res) => {
  const result = await CarService.returnCar(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Car returned successfully',
    data: result,
  });
});

export const CarController = {
  createCar,
  getAllCars,
  getSingleCar,
  updateCar,
  deleteCar,
  returnCar,
};
