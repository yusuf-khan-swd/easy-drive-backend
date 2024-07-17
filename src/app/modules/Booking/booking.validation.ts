import { z } from 'zod';

// TODO: Check startTime and endTime time validation

const bookingValidationSchema = z.object({
  body: z.object({
    carId: z.string({ required_error: 'Car Id is required' }),
    date: z.string({ required_error: 'Date is required' }),
    startTime: z
      .string()
      .regex(/^([01]\d|2[0-3]):?([0-5]\d)$/, 'Invalid start time format'),
  }),
});

export const BookingValidation = {
  bookingValidationSchema,
};
