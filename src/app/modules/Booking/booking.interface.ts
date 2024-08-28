import { Types } from 'mongoose';

export type TBooking = {
  date: string;
  user: Types.ObjectId;
  car: Types.ObjectId;
  startTime: string;
  endTime: string;
  totalCost: number;
  isDeleted?: boolean;
};

export type TUserBooking = {
  carId: string;
  date: string;
  startTime: string;
};
