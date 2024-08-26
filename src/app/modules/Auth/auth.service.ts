import httpStatus from 'http-status';
import config from '../../config';
import AppError from '../../errors/AppError';
import { USER_ROLE } from '../User/user.constant';
import { TUser } from '../User/user.interface';
import { User } from '../User/user.model';
import { TLoginUser } from './auth.interface';
import { createToken } from './auth.utils';

const signUp = async (payload: TUser) => {
  const data = { ...payload, role: USER_ROLE.user };
  const result = await User.create(data);
  return result;
};

const loginUser = async (payload: TLoginUser) => {
  const user = await User.isUserExistByEmail(payload.email);

  if (!user) throw new AppError(httpStatus.NOT_FOUND, 'User not found !');

  const isPasswordMatched = await User.isPasswordMatched(
    payload?.password,
    user?.password,
  );

  if (!isPasswordMatched)
    throw new AppError(httpStatus.FORBIDDEN, 'Password do not matched');

  const jwtPayload = { email: user?.email, role: user?.role };

  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as string,
  );

  const result = await User.findOne({ email: payload.email });

  return { user: result, accessToken };
};

export const AuthService = {
  signUp,
  loginUser,
};
