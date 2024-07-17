import { z } from 'zod';

// TODO: Check status and isDeleted validation because of default value. And other default value validation

const createCarValidationSchema = z.object({
  body: z.object({
    name: z.string({ required_error: 'Name is required' }),
    description: z.string({ required_error: 'Description is required' }),
    color: z.string({ required_error: 'Color is required' }),
    isElectric: z.boolean(),
    // status: z.enum(['available', 'unavailable']).default('available'),
    features: z.array(z.string({ required_error: 'Features are required' })),
    pricePerHour: z.number().min(0, 'Price per hour must be a positive number'),
    // isDeleted: z.boolean().default(false),
  }),
});

const updateCarValidationSchema = z.object({
  body: z.object({
    name: z.string().optional(),
    description: z.string().optional(),
    color: z.string().optional(),
    isElectric: z.boolean().optional(),
    features: z.array(z.string()).optional(),
    pricePerHour: z
      .number()
      .min(0, 'Price per hour must be a positive number')
      .optional(),
  }),
});

const returnCarValidationSchema = z.object({
  body: z.object({
    bookingId: z.string({ required_error: 'Booking ID is required' }),
    endTime: z
      .string()
      .regex(/^([01]\d|2[0-3]):?([0-5]\d)$/, 'Invalid end time format'),
  }),
});

export const CarValidation = {
  createCarValidationSchema,
  updateCarValidationSchema,
  returnCarValidationSchema,
};
