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
    // status: {
    //   type: String,
    //   enum: ['Pending', 'Confirmed', 'Cancelled'],
    //   default: 'Pending',
    // },
    // paymentStatus: {
    //   type: String,
    //   enum: ['Pending', 'Paid', 'Failed'],
    //   default: 'Pending',
    // },
    // transactionId: {
    //   type: String,
    //   required: true,
    // },
  },
  {
    timestamps: true,
  },
);

export const Booking = model<TBooking>('Booking', bookingSchema);
