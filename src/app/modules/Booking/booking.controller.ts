import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { BookingService } from './booking.service';

const createBooking = catchAsync(async (req, res) => {
  const data = req.body;
  const user = req.user;

  const result = await BookingService.createBooking(data, user);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Booking Created Successfully',
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

const myBooking = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await BookingService.myBooking(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'My Bookings retrieved successfully',
    data: result,
  });
});

export const BookingController = {
  createBooking,
  getAllBookings,
  myBooking,
};
