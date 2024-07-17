import { z } from 'zod';

// TODO: Check startTime and endTime time validation

const bookingValidationSchema = z.object({
  body: z.object({
    date: z.string({ required_error: 'Date is required' }),
    user: z.string({ required_error: 'User ID is required' }),
    car: z.string({ required_error: 'Car ID is required' }),
    startTime: z
      .string()
      .regex(/^([01]\d|2[0-3]):?([0-5]\d)$/, 'Invalid start time format'),
    endTime: z
      .string()
      .regex(/^([01]\d|2[0-3]):?([0-5]\d)$/, 'Invalid end time format'),
    totalCost: z.number().default(0),
  }),
});

export const BookingValidation = {
  bookingValidationSchema,
};
