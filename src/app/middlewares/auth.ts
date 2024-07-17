import httpStatus from 'http-status';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../config';
import AppError from '../errors/AppError';
import { TUserRole } from '../modules/User/user.interface';
import { User } from '../modules/User/user.model';
import catchAsync from '../utils/catchAsync';

const auth = (...requiredRoles: TUserRole[]) => {
  return catchAsync(async (req, res, next) => {
    const token = req.headers.authorization;

    if (!token)
      throw new AppError(
        httpStatus.UNAUTHORIZED,
        'You are not authorized! Token is Missing',
      );

    const decoded = jwt.verify(
      token,
      config.jwt_access_secret as string,
    ) as JwtPayload;

    const { role, userId, iat } = decoded;

    const user = await User.isUserExistsByCustomId(userId);

    if (!user) {
      throw new AppError(httpStatus.NOT_FOUND, 'User Not found !');
    }

    const isDeleted = user?.isDeleted;

    if (isDeleted)
      throw new AppError(httpStatus.FORBIDDEN, 'This User is Deleted !');

    const userStatus = user?.status === 'blocked';

    if (userStatus)
      throw new AppError(httpStatus.FORBIDDEN, 'This User is Blocked !');

    if (
      user.passwordChangedAt &&
      User.isJWTIssuedBeforePasswordChanged(
        user.passwordChangedAt,
        iat as number,
      )
    )
      throw new AppError(
        httpStatus.UNAUTHORIZED,
        'You are not authorized! Old Token, That issued before Password Change',
      );

    if (requiredRoles && !requiredRoles.includes(role))
      throw new AppError(
        httpStatus.UNAUTHORIZED,
        'You are not authorized to access this route!',
      );

    req.user = decoded as JwtPayload;

    next();
  });
};

export default auth;
