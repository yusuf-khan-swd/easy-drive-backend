import { z } from 'zod';

const userValidationSchema = z.object({
  body: z.object({
    name: z.string({ required_error: 'Name is required' }),
    email: z.string().email(),
    password: z.string().min(8, 'Password must be at least 8 characters long'),
    phone: z.string().optional(),
    address: z.string().optional(),
  }),
});

export const UserValidation = {
  userValidationSchema,
};
