import bcrypt from 'bcrypt';
import httpStatus from 'http-status';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../../config';
import AppError from '../../errors/AppError';
import { User } from '../User/user.model';
import { TLoginUser } from './auth.interface';
import { createToken } from './auth.utils';

const loginUser = async (payload: TLoginUser) => {
  const user = await User.isUserExistByEmail(payload.email);

  if (!user) throw new AppError(httpStatus.NOT_FOUND, 'User not found !');

  const isPasswordMatched = await User.isPasswordMatched(
    payload?.password,
    user?.password,
  );

  if (!isPasswordMatched)
    throw new AppError(httpStatus.FORBIDDEN, 'Password do not matched');

  const jwtPayload = { userEmail: user?.email, role: user?.role };

  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as string,
  );

  const refreshToken = createToken(
    jwtPayload,
    config.jwt_refresh_secret as string,
    config.jwt_refresh_expires_in as string,
  );

  return {
    accessToken,
    refreshToken,
  };
};

const refreshToken = async (token: string) => {
  const decoded = jwt.verify(
    token,
    config.jwt_refresh_secret as string,
  ) as JwtPayload;
  const { userEmail } = decoded;

  const user = await User.isUserExistByEmail(userEmail);

  if (!user) throw new AppError(httpStatus.NOT_FOUND, 'User not found !');

  const jwtPayload = { userEmail: user?.email, role: user?.role };

  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as string,
  );

  return { accessToken };
};

const changePassword = async (
  userData: JwtPayload,
  payload: { oldPassword: string; newPassword: string },
) => {
  const user = await User.isUserExistByEmail(userData.email);

  if (!user) throw new AppError(httpStatus.NOT_FOUND, 'User not found !');

  const isPasswordMatched = await User.isPasswordMatched(
    payload?.oldPassword,
    user?.password,
  );

  if (!isPasswordMatched)
    throw new AppError(httpStatus.FORBIDDEN, 'Password do not matched');

  const newHashPassword = await bcrypt.hash(
    payload.newPassword,
    Number(config.bcrypt_salt_rounds),
  );

  await User.findOneAndUpdate(
    { id: userData.userEmail, role: userData.role },
    {
      password: newHashPassword,
      needsPasswordChange: false,
      passwordChangedAt: new Date(),
    },
  );

  return null;
};

export const AuthService = {
  loginUser,
  changePassword,
  refreshToken,
};
