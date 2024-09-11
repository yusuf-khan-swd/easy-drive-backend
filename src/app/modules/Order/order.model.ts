import { Document, model, Schema, Types } from 'mongoose';

interface IOrder extends Document {
  user: Types.ObjectId;
  car: Types.ObjectId;
  booking: Types.ObjectId;
  totalCost: number;
  paymentStatus: string;
  transactionId: string;
}

const OrderSchema: Schema = new Schema(
  {
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
    booking: {
      type: Schema.Types.ObjectId,
      ref: 'Booking',
      required: true,
    },
    totalCost: {
      type: Number,
      required: true,
    },
    paymentStatus: {
      type: String,
      enum: ['Pending', 'Paid', 'Failed'],
      default: 'Pending',
    },
    transactionId: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

export const Order = model<IOrder>('Order', OrderSchema);
