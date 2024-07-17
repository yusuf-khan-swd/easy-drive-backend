import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { OfferedCourseController } from './offeredCourse.controller';
import { OfferedCourseValidation } from './offeredCourse.validation';

const router = express.Router();

router.post(
  '/create-offered-course',
  validateRequest(OfferedCourseValidation.createOfferedCourseValidationSchema),
  OfferedCourseController.createOfferedCourse,
);

router.get('/', OfferedCourseController.getAllOfferedCourses);

router.get('/:id', OfferedCourseController.getSingleOfferedCourse);

router.patch(
  '/:id',
  validateRequest(OfferedCourseValidation.updateOfferedCourseValidationSchema),
  OfferedCourseController.updateOfferedCourse,
);

router.delete('/:id', OfferedCourseController.deleteOfferedCourse);

export const OfferedCourseRoutes = router;
