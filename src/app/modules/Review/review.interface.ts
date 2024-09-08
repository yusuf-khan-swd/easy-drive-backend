import { Types } from 'mongoose';

export type TReview = {
  rating: number;
  title: string;
  description: string;
  user: Types.ObjectId;
  car: Types.ObjectId;
};
