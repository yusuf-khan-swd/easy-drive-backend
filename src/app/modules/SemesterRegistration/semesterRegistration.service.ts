import httpStatus from 'http-status';
import mongoose from 'mongoose';
import QueryBuilder from '../../builder/QueryBuilder';
import AppError from '../../errors/AppError';
import { AcademicSemester } from '../AcademicSemester/academicSemester.model';
import { OfferedCourse } from '../OfferedCourse/offeredCourse.model';
import { RegistrationStatus } from './semesterRegistration.constant';
import { TSemesterRegistration } from './semesterRegistration.interface';
import { SemesterRegistration } from './semesterRegistration.model';

const createSemesterRegistrationIntoDB = async (
  payload: TSemesterRegistration,
) => {
  const academicSemesterId = payload?.academicSemester;

  //check if there any registered semester that is already 'UPCOMING'|'ONGOING'
  const isThereAnyUpcomingOrOngoingSEmester =
    await SemesterRegistration.findOne({
      $or: [
        { status: RegistrationStatus.UPCOMING },
        { status: RegistrationStatus.ONGOING },
      ],
    });

  if (isThereAnyUpcomingOrOngoingSEmester)
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `There is already an ${isThereAnyUpcomingOrOngoingSEmester.status} registered semester !`,
    );

  const isAcademicSemesterExist =
    await AcademicSemester.findById(academicSemesterId);

  if (!isAcademicSemesterExist)
    throw new AppError(
      httpStatus.NOT_FOUND,
      'This Academic Semester does not exist',
    );

  const isSemesterRegistrationExist = await SemesterRegistration.findOne({
    academicSemester: academicSemesterId,
  });

  if (isSemesterRegistrationExist)
    throw new AppError(httpStatus.CONFLICT, 'This Semester already exist');

  const result = await SemesterRegistration.create(payload);
  return result;
};

const getAllSemesterRegistrationFromDB = async (
  query: Record<string, unknown>,
) => {
  const semesterRegistrationQuery = new QueryBuilder(
    SemesterRegistration.find().populate('academicSemester'),
    query,
  )
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await semesterRegistrationQuery.modelQuery;
  return result;
};

const getSingleSemesterRegistrationsFromDB = async (id: string) => {
  const result = await SemesterRegistration.findById(id);
  return result;
};

const updateSemesterRegistrationIntoDB = async (
  id: string,
  payload: Partial<TSemesterRegistration>,
) => {
  const isSemesterRegistrationExist = await SemesterRegistration.findById(id);

  if (!isSemesterRegistrationExist)
    throw new AppError(httpStatus.NOT_FOUND, 'This Semester does not exist');

  const currentSemesterStatus = isSemesterRegistrationExist?.status;
  const requestedStatus = payload?.status;

  if (currentSemesterStatus === RegistrationStatus.ENDED)
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `This semester is already ${currentSemesterStatus}`,
    );

  if (
    currentSemesterStatus === RegistrationStatus.UPCOMING &&
    requestedStatus === RegistrationStatus.ENDED
  )
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `You can not directly change status from ${currentSemesterStatus} to ${requestedStatus}`,
    );

  if (
    currentSemesterStatus === RegistrationStatus.ONGOING &&
    requestedStatus === RegistrationStatus.UPCOMING
  )
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `You can not directly change status from ${currentSemesterStatus} to ${requestedStatus}`,
    );

  const result = await SemesterRegistration.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });

  return result;
};

const deleteSemesterRegistrationFromDB = async (id: string) => {
  /** 
  * Step1: Delete associated offered courses.
  * Step2: Delete semester registration when the status is 
  'UPCOMING'.
  **/

  // checking if the semester registration is exist
  const isSemesterRegistrationExists = await SemesterRegistration.findById(id);

  if (!isSemesterRegistrationExists) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'This registered semester is not found !',
    );
  }

  // checking if the status is still "UPCOMING"
  const semesterRegistrationStatus = isSemesterRegistrationExists.status;

  if (semesterRegistrationStatus !== 'UPCOMING') {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `You can not update as the registered semester is ${semesterRegistrationStatus}`,
    );
  }

  const session = await mongoose.startSession();

  //deleting associated offered courses

  try {
    session.startTransaction();

    const deletedOfferedCourse = await OfferedCourse.deleteMany(
      {
        semesterRegistration: id,
      },
      {
        session,
      },
    );

    if (!deletedOfferedCourse) {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        'Failed to delete semester registration !',
      );
    }

    const deletedSemesterRegistration =
      await SemesterRegistration.findByIdAndDelete(id, {
        session,
        new: true,
      });

    if (!deletedSemesterRegistration) {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        'Failed to delete semester registration !',
      );
    }

    await session.commitTransaction();
    await session.endSession();

    return null;
  } catch (err: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(err);
  }
};

export const SemesterRegistrationService = {
  createSemesterRegistrationIntoDB,
  getAllSemesterRegistrationFromDB,
  getSingleSemesterRegistrationsFromDB,
  updateSemesterRegistrationIntoDB,
  deleteSemesterRegistrationFromDB,
};
