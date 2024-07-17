import httpStatus from 'http-status';
import mongoose from 'mongoose';
import QueryBuilder from '../../builder/QueryBuilder';
import AppError from '../../errors/AppError';
import { CourseSearchableFields } from './course.constant';
import { TCourse, TCourseFaculty } from './course.interface';
import { Course, CourseFaculty } from './course.model';

const createCourseIntoDB = async (payload: TCourse) => {
  const result = await Course.create(payload);
  return result;
};

const getAllCourseFromDB = async (query: Record<string, unknown>) => {
  const courserQuery = new QueryBuilder(
    Course.find().populate('preRequisiteCourses.course'),
    query,
  )
    .search(CourseSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await courserQuery.modelQuery;
  return result;
};

const getSingleCoursesFromDB = async (id: string) => {
  const result = await Course.findById(id).populate(
    'preRequisiteCourses.course',
  );
  return result;
};

const updateCourseIntoDB = async (id: string, payload: Partial<TCourse>) => {
  const { preRequisiteCourses, ...courseRemainingData } = payload;

  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const updateCourseBasicInfo = await Course.findByIdAndUpdate(
      id,
      courseRemainingData,
      {
        new: true,
        runValidators: true,
      },
    );

    if (!updateCourseBasicInfo) {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        'Failed to update basic course info!',
      );
    }

    if (preRequisiteCourses && preRequisiteCourses?.length > 0) {
      // Remove PreRequisites Courses
      const deletedPreRequisites = preRequisiteCourses
        .filter((el) => el.course && el.isDeleted)
        .map((el) => el.course);

      const deletedPreRequisiteCourses = await Course.findByIdAndUpdate(
        id,
        {
          $pull: {
            preRequisiteCourses: { course: { $in: deletedPreRequisites } },
          },
        },
        { new: true, runValidators: true },
      );

      if (!deletedPreRequisiteCourses) {
        throw new AppError(
          httpStatus.BAD_REQUEST,
          'Failed to update course PreRequisite!',
        );
      }
      // Add PreRequisites Courses
      const newPreRequisites = preRequisiteCourses.filter(
        (el) => el.course && !el.isDeleted,
      );

      const newPreRequisitesCourses = await Course.findByIdAndUpdate(id, {
        $addToSet: { preRequisiteCourses: { $each: newPreRequisites } },
      });

      if (!newPreRequisitesCourses) {
        throw new AppError(
          httpStatus.BAD_REQUEST,
          'Failed to update new course PreRequisite!',
        );
      }
    }

    session.commitTransaction();
    session.endSession();

    const result = await Course.findById(id).populate(
      'preRequisiteCourses.course',
    );

    return result;
  } catch (error) {
    session.abortTransaction();
    session.endSession();

    throw new AppError(
      httpStatus.BAD_REQUEST,
      'Failed to update basic course info and preRequisite Courses!',
    );
  }
};

const deleteCourseFromDB = async (id: string) => {
  const result = await Course.findByIdAndUpdate(
    id,
    { isDeleted: true },
    {
      new: true,
    },
  );
  return result;
};

const assignFacultiesWithCourseIntoDB = async (
  id: string,
  payload: Partial<TCourseFaculty>,
) => {
  const result = await CourseFaculty.findByIdAndUpdate(
    id,
    { course: id, $addToSet: { faculties: { $each: payload } } },
    {
      upsert: true,
      new: true,
    },
  );
  return result;
};

const removeFacultiesFromCourseFromDB = async (
  id: string,
  payload: Partial<TCourseFaculty>,
) => {
  const result = await CourseFaculty.findByIdAndUpdate(
    id,
    { $pull: { faculties: { $in: payload } } },
    { new: true },
  );
  return result;
};

export const CourseService = {
  createCourseIntoDB,
  getAllCourseFromDB,
  getSingleCoursesFromDB,
  updateCourseIntoDB,
  deleteCourseFromDB,
  assignFacultiesWithCourseIntoDB,
  removeFacultiesFromCourseFromDB,
};
