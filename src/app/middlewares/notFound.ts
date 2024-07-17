/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';

const notFound = (req: Request, res: Response, next: NextFunction) => {
  const statusCode = httpStatus.NOT_FOUND;
  const message = 'Not Found';

  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
};

export default notFound;
