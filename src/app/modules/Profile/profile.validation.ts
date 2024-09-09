import { z } from 'zod';

const profileUpdateValidationSchema = z.object({
  body: z.object({
    name: z.string().optional(),
    email: z.string().email().optional(),
    phone: z.string().optional(),
    address: z.string().optional(),
  }),
});

export const ProfileValidation = {
  profileUpdateValidationSchema,
};
