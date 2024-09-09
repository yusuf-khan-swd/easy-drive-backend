import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { TUser } from '../User/user.interface';
import { User } from '../User/user.model';

const getUserProfile = async (id: string) => {
  const result = await User.findById(id);

  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found');
  }

  return result;
};

const updateUserProfile = async (id: string, payload: Partial<TUser>) => {
  const isUserExists = await User.findById(id);

  if (!isUserExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found');
  }

  const result = await User.findByIdAndUpdate(id, payload, {
    new: true,
  });

  return result;
};

export const ProfileService = {
  getUserProfile,
  updateUserProfile,
};
