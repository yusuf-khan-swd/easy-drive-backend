import { Schema, model } from 'mongoose';
import { TBooking } from './booking.interface';

const bookingSchema = new Schema<TBooking>(
  {
    date: {
      type: String,
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    car: {
      type: Schema.Types.ObjectId,
      ref: 'Car',
      required: true,
    },
    startTime: {
      type: String,
      required: true,
    },
    endTime: {
      type: String,
      default: null,
    },
    totalCost: {
      type: Number,
      default: 0,
    },
    // TODO: Admin can confirm booking User can Cancelled. User cannot cancel if admin confirm. Admin cannot confirm if user cancel
    // status: {
    //   type: String,
    //   enum: ['Pending', 'Confirmed', 'Cancelled'],
    //   default: 'Pending',
    // },
    paymentStatus: {
      type: String,
      enum: ['Pending', 'Paid', 'Failed'],
    },
  },
  {
    timestamps: true,
  },
);

export const Booking = model<TBooking>('Booking', bookingSchema);
