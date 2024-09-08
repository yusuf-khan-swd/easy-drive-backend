import { z } from 'zod';

const reviewValidationSchema = z.object({
  body: z.object({
    rating: z.number({ required_error: 'Rating is required' }),
    title: z.string({ required_error: 'Title is required' }),
    description: z.string({ required_error: 'Description is required' }),
  }),
});

const updateReviewValidationSchema = z.object({
  body: z.object({
    rating: z.number().optional(),
    title: z.string().optional(),
    description: z.string().optional(),
  }),
});

export const ReviewValidation = {
  reviewValidationSchema,
  updateReviewValidationSchema,
};
