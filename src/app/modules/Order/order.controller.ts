import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { orderService } from './order.service';

const createOrder = async (req: Request, res: Response) => {
  try {
    const orderData = req.body;
    const newOrder = await orderService.createOrder(orderData);
    res.status(201).json({
      success: true,
      message: 'Order created successfully!',
      data: newOrder,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: (error as Error).message,
      error,
    });
  }
};

const myOrders = catchAsync(async (req, res) => {
  const user = req.user;
  const result = await orderService.myOrders(user);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'My Bookings retrieved successfully',
    data: result,
  });
});

export const OrderController = {
  createOrder,
  myOrders,
};
