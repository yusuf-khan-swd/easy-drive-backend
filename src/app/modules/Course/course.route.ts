import express from 'express';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { USER_ROLE } from '../User/user.constant';
import { CourseController } from './course.controller';
import { CourseValidation } from './course.validation';

const router = express.Router();

router.post(
  '/create-course',
  auth(USER_ROLE.admin),
  validateRequest(CourseValidation.createCourseValidationSchema),
  CourseController.createCourse,
);

router.get(
  '/',
  auth(USER_ROLE.admin, USER_ROLE.faculty, USER_ROLE.student),
  CourseController.getAllCourses,
);

router.get('/:id', CourseController.getSingleCourse);

router.patch(
  '/:id',
  auth(USER_ROLE.admin),
  validateRequest(CourseValidation.updateCourseValidationSchema),
  CourseController.updateCourse,
);

router.delete('/:id', auth(USER_ROLE.admin), CourseController.deleteCourse);

router.put(
  '/:courseId/assign-faculties',
  auth(USER_ROLE.admin),
  validateRequest(CourseValidation.facultyWithCourseValidationSchema),
  CourseController.assignFacultiesWithCourse,
);

router.delete(
  '/:courseId/remove-faculties',
  auth(USER_ROLE.admin),
  validateRequest(CourseValidation.facultyWithCourseValidationSchema),
  CourseController.removeFacultiesFromCourse,
);

export const CourseRoutes = router;
