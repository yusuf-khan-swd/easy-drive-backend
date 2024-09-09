import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { ProfileService } from './profile.service';

const getUserProfile = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await ProfileService.getUserProfile(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User Profile retrieve successfully',
    data: result,
  });
});

const updateUserProfile = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await ProfileService.updateUserProfile(id, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User Profile updated successfully',
    data: result,
  });
});

export const ProfileController = {
  getUserProfile,
  updateUserProfile,
};
