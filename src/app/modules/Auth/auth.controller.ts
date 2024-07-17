import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { AuthService } from './auth.service';

const signUp = catchAsync(async (req, res) => {
  const data = req.body;

  const result = await AuthService.signUp(data);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'User registered successfully',
    data: result,
  });
});

const loginUser = catchAsync(async (req, res) => {
  const data = req.body;
  const result = await AuthService.loginUser(data);
  const { user, accessToken } = result;

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User logged in Successfully',
    data: { user, token: accessToken },
  });
});

export const AuthController = {
  loginUser,
  signUp,
};
