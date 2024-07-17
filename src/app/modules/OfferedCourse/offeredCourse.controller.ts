import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { OfferedCourseService } from './offeredCourse.service';

const createOfferedCourse = catchAsync(async (req, res) => {
  const data = req.body;

  const result = await OfferedCourseService.createOfferedCourseIntoDB(data);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'OfferedCourse Created Successfully',
    data: result,
  });
});

const getAllOfferedCourses = catchAsync(async (req, res) => {
  const result = await OfferedCourseService.getAllOfferedCourseFromDB(
    req.query,
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'OfferedCourses are retrieved successfully',
    data: result,
  });
});

const getSingleOfferedCourse = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await OfferedCourseService.getSingleOfferedCoursesFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'OfferedCourse is retrieved successfully',
    data: result,
  });
});

const updateOfferedCourse = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await OfferedCourseService.updateOfferedCourseIntoDB(
    id,
    req.body,
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'OfferedCourse updated successfully',
    data: result,
  });
});

const deleteOfferedCourse = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await OfferedCourseService.deleteOfferedCourseFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Course deleted successfully',
    data: result,
  });
});

export const OfferedCourseController = {
  createOfferedCourse,
  getAllOfferedCourses,
  getSingleOfferedCourse,
  updateOfferedCourse,
  deleteOfferedCourse,
};
