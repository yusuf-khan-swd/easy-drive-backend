import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { BookingService } from './booking.service';

const createBooking = catchAsync(async (req, res) => {
  const data = req.body;
  const user = req.user;

  const result = await BookingService.createBooking(data, user);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Car booked successfully',
    data: result,
  });
});

const getAllBookings = catchAsync(async (req, res) => {
  const result = await BookingService.getAllBooking(req.query);

  if (result.length > 0) {
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Bookings retrieved successfully',
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

const getAllBookingByCarAndDate = catchAsync(async (req, res) => {
  const result = await BookingService.getAllBookingByCarAndDate(req.query);

  if (result.length > 0) {
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Bookings retrieved successfully',
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

const getSingleBooking = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await BookingService.getSingleBooking(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Single Booking retrieved successfully',
    data: result,
  });
});

const myBookings = catchAsync(async (req, res) => {
  const user = req.user;
  const result = await BookingService.myBookings(user);

  if (result.length > 0) {
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'My Bookings retrieved successfully',
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

const updateBooking = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await BookingService.updateBooking(id, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Booking updated successfully',
    data: result,
  });
});

const deleteMyBooking = catchAsync(async (req, res) => {
  const user = req.user;
  const { id } = req.params;
  const result = await BookingService.deleteMyBooking(user, id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Booking Deleted successfully',
    data: result,
  });
});

const deleteBooking = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await BookingService.deleteBooking(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Booking Deleted successfully',
    data: result,
  });
});

export const BookingController = {
  createBooking,
  getAllBookings,
  myBookings,
  deleteMyBooking,
  getAllBookingByCarAndDate,
  deleteBooking,
  getSingleBooking,
  updateBooking,
};
