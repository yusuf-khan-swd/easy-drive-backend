import { z } from 'zod';

const userValidationSchema = z.object({
  body: z.object({
    name: z.string({ required_error: 'Name is required' }),
    email: z.string({ required_error: 'Email is required' }).email(),
    password: z.string().min(6, 'Password must be at least 6 characters long'),
    phone: z.string().optional(),
    address: z.string().optional(),
  }),
});

const userUpdateValidationSchema = z.object({
  body: z.object({
    name: z.string().optional(),
    email: z.string().email().optional(),
    phone: z.string().optional(),
    address: z.string().optional(),
  }),
});

export const UserValidation = {
  userValidationSchema,
  userUpdateValidationSchema,
};
