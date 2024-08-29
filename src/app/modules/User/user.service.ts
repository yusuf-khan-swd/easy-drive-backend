import httpStatus from 'http-status';
import QueryBuilder from '../../builder/QueryBuilder';
import AppError from '../../errors/AppError';

import { USER_ROLE } from './user.constant';
import { TUser } from './user.interface';
import { User } from './user.model';

const createAdmin = async (payload: TUser) => {
  const isUserExists = await User.isUserExistByEmail(payload.email);

  if (isUserExists)
    throw new AppError(httpStatus.BAD_REQUEST, 'Admin already Exist !');

  const data = { ...payload, role: USER_ROLE.admin };
  const result = await User.create(data);
  return result;
};

const getAllUsers = async (query: Record<string, unknown>) => {
  const carQuery = new QueryBuilder(User.find(), query)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await carQuery.modelQuery;
  return result;
};

const deleteUser = async (id: string) => {
  const result = await User.findByIdAndDelete(id);
  return result;
};

export const UserService = {
  createAdmin,
  getAllUsers,
  deleteUser,
};
