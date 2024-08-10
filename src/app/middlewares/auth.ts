import httpStatus from 'http-status';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../config';
import AppError from '../errors/AppError';
import { TUserRole } from '../modules/User/user.interface';
import { User } from '../modules/User/user.model';
import catchAsync from '../utils/catchAsync';

const auth = (...requiredRoles: TUserRole[]) => {
  return catchAsync(async (req, res, next) => {
    let token = req.headers.authorization;

    token = token && token.split(' ')[1];

    if (!token)
      throw new AppError(
        httpStatus.UNAUTHORIZED,
        'You have no access to this route',
      );

    const decoded = jwt.verify(
      token,
      config.jwt_access_secret as string,
    ) as JwtPayload;

    const { role, userEmail } = decoded;

    const user = await User.isUserExistByEmail(userEmail);

    if (!user) {
      throw new AppError(httpStatus.NOT_FOUND, 'User Not found !');
    }

    if (requiredRoles && !requiredRoles.includes(role))
      throw new AppError(
        httpStatus.UNAUTHORIZED,
        'You have no access to this route',
      );

    req.user = decoded as JwtPayload;

    next();
  });
};

export default auth;
