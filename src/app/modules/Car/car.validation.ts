import { z } from 'zod';

// TODO: Check status and isDeleted validation because of default value. And other default value validation

const carValidationSchema = z.object({
  body: z.object({
    name: z.string({ required_error: 'Name is required' }),
    description: z.string({ required_error: 'Description is required' }),
    color: z.string({ required_error: 'Color is required' }),
    isElectric: z.boolean(),
    // status: z.enum(['available', 'unavailable']).default('available'),
    features: z.array(z.string({ required_error: 'Features are required' })),
    pricePerHour: z.number().min(0, 'Price per hour must be a positive number'),
    // isDeleted: z.boolean().default(false),

    email: z.string().email(),
    password: z.string().min(8, 'Password must be at least 8 characters long'),
    phone: z.string({ required_error: 'Phone number is required' }),
    address: z.string({ required_error: 'Address is required' }),
  }),
});

export const CarValidation = {
  carValidationSchema,
};
