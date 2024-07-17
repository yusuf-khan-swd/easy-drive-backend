import bcrypt from 'bcrypt';
import httpStatus from 'http-status';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../../config';
import AppError from '../../errors/AppError';
import { User } from '../User/user.model';
import { TLoginUser } from './auth.interface';
import { createToken } from './auth.utils';

const loginUser = async (payload: TLoginUser) => {
  const user = await User.isUserExistsByCustomId(payload.id);

  if (!user) throw new AppError(httpStatus.NOT_FOUND, 'User not found !');

  const isDeleted = user?.isDeleted;

  if (isDeleted)
    throw new AppError(httpStatus.FORBIDDEN, 'This User is Deleted !');

  const userStatus = user?.status === 'blocked';

  if (userStatus)
    throw new AppError(httpStatus.FORBIDDEN, 'This User is Blocked !');

  const isPasswordMatched = await User.isPasswordMatched(
    payload?.password,
    user?.password,
  );

  if (!isPasswordMatched)
    throw new AppError(httpStatus.FORBIDDEN, 'Password do not matched');

  const jwtPayload = { userId: user?.id, role: user?.role };

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
    needsPasswordChange: user?.needsPasswordChange,
  };
};

const changePassword = async (
  userData: JwtPayload,
  payload: { oldPassword: string; newPassword: string },
) => {
  const user = await User.isUserExistsByCustomId(userData.userId);

  if (!user) throw new AppError(httpStatus.NOT_FOUND, 'User not found !');

  const isDeleted = user?.isDeleted;

  if (isDeleted)
    throw new AppError(httpStatus.FORBIDDEN, 'This User is Deleted !');

  const userStatus = user?.status === 'blocked';

  if (userStatus)
    throw new AppError(httpStatus.FORBIDDEN, 'This User is Blocked !');

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
    { id: userData.userId, role: userData.role },
    {
      password: newHashPassword,
      needsPasswordChange: false,
      passwordChangedAt: new Date(),
    },
  );

  return null;
};

const refreshToken = async (token: string) => {
  const decoded = jwt.verify(
    token,
    config.jwt_refresh_secret as string,
  ) as JwtPayload;
  const { userId, iat } = decoded;

  const user = await User.isUserExistsByCustomId(userId);

  if (!user) throw new AppError(httpStatus.NOT_FOUND, 'User not found !');

  const isDeleted = user?.isDeleted;

  if (isDeleted)
    throw new AppError(httpStatus.FORBIDDEN, 'This User is Deleted !');

  const userStatus = user?.status === 'blocked';

  if (userStatus)
    throw new AppError(httpStatus.FORBIDDEN, 'This User is Blocked !');

  if (
    user.passwordChangedAt &&
    User.isJWTIssuedBeforePasswordChanged(user.passwordChangedAt, iat as number)
  )
    throw new AppError(
      httpStatus.UNAUTHORIZED,
      'You are not authorized! Old Token, That issued before Password Change',
    );

  const jwtPayload = { userId: user?.id, role: user?.role };

  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as string,
  );

  return { accessToken };
};

export const AuthService = {
  loginUser,
  changePassword,
  refreshToken,
};
