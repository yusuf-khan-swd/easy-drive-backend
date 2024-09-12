import express from 'express';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { USER_ROLE } from '../User/user.constant';
import { ReviewController } from './review.controller';
import { ReviewValidation } from './review.validation';

const router = express.Router();

router.post(
  '/',
  auth(USER_ROLE.user),
  validateRequest(ReviewValidation.reviewValidationSchema),
  ReviewController.createReview,
);

router.get('/', auth(USER_ROLE.admin), ReviewController.getAllReviews);

router.get('/my-reviews', auth(USER_ROLE.user), ReviewController.getMyReviews);

router.get('/car/:id', ReviewController.getCarReviews);

router.get(
  '/:id',
  auth(USER_ROLE.user, USER_ROLE.admin),
  ReviewController.getSingleReview,
);

router.put(
  '/:id',
  auth(USER_ROLE.user, USER_ROLE.admin),
  validateRequest(ReviewValidation.updateReviewValidationSchema),
  ReviewController.updateReview,
);

router.delete(
  '/:id',
  auth(USER_ROLE.user, USER_ROLE.admin),
  ReviewController.deleteReview,
);

export const ReviewRoutes = router;
