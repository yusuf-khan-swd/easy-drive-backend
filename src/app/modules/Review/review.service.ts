import httpStatus from 'http-status';
import QueryBuilder from '../../builder/QueryBuilder';
import AppError from '../../errors/AppError';
import { TReview } from './review.interface';
import { Review } from './review.model';

const createReview = async (payload: TReview) => {
  const result = await Review.create(payload);
  return result;
};

const getAllReview = async (query: Record<string, unknown>) => {
  const carQuery = new QueryBuilder(
    Review.find().populate('user').populate('car'),
    query,
  )
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await carQuery.modelQuery;
  return result;
};

const getSingleReview = async (id: string) => {
  const result = await Review.findById(id).populate('user').populate('car');

  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, 'Review not found');
  }

  return result;
};

const updateReview = async (id: string, payload: Partial<TReview>) => {
  const isReviewExists = await Review.findById(id);

  if (!isReviewExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'Review not found');
  }

  const result = await Review.findByIdAndUpdate(id, payload, {
    new: true,
  });

  return result;
};

const deleteReview = async (id: string) => {
  const isReviewExists: any = await Review.findById(id);

  if (!isReviewExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'Review not found');
  }
  const result = await Review.findByIdAndDelete(id);

  return result;
};

export const ReviewService = {
  createReview,
  getAllReview,
  deleteReview,
  getSingleReview,
  updateReview,
};
