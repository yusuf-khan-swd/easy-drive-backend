import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { AcademicDepartmentController } from './academicDepartment.controller';
import { AcademicDepartmentValidation } from './academicDepartment.validation';

const router = express.Router();

router.post(
  '/create-academic-department',
  validateRequest(
    AcademicDepartmentValidation.createAcademicDepartmentValidationSchema,
  ),
  AcademicDepartmentController.createAcademicDepartment,
);

router.get('/', AcademicDepartmentController.getAllAcademicDepartments);

router.get(
  '/:departmentId',
  AcademicDepartmentController.getSingleAcademicDepartment,
);

router.patch(
  '/:departmentId',
  validateRequest(
    AcademicDepartmentValidation.updateAcademicDepartmentValidationSchema,
  ),
  AcademicDepartmentController.updateAcademicDepartment,
);

export const AcademicDepartmentRoutes = router;
