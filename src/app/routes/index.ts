import { Router } from 'express';
import { AcademicDepartmentRoutes } from '../modules/AcademicDepartment/academicDepartment.route';
import { AcademicFacultyRoutes } from '../modules/AcademicFaculty/academicFaculty.route';
import { AcademicSemesterRoutes } from '../modules/AcademicSemester/academicSemester.route';
import { AdminRoutes } from '../modules/Admin/admin.route';
import { AuthRoutes } from '../modules/Auth/auth.route';
import { CourseRoutes } from '../modules/Course/course.route';
import { FacultyRoutes } from '../modules/Faculty/faculty.route';
import { OfferedCourseRoutes } from '../modules/OfferedCourse/offeredCourse.route';
import { SemesterRegistrationRoutes } from '../modules/SemesterRegistration/semesterRegistration.route';
import { StudentRoutes } from '../modules/Student/student.route';
import { UserRoutes } from '../modules/User/user.route';

const router = Router();

const moduleRoutes = [
  {
    path: '/students',
    route: StudentRoutes,
  },
  {
    path: '/users',
    route: UserRoutes,
  },
  {
    path: '/faculties',
    route: FacultyRoutes,
  },
  {
    path: '/admins',
    route: AdminRoutes,
  },
  {
    path: '/academic-semesters',
    route: AcademicSemesterRoutes,
  },
  {
    path: '/academic-faculties',
    route: AcademicFacultyRoutes,
  },
  {
    path: '/academic-departments',
    route: AcademicDepartmentRoutes,
  },
  {
    path: '/courses',
    route: CourseRoutes,
  },
  {
    path: '/semester-registrations',
    route: SemesterRegistrationRoutes,
  },
  {
    path: '/offered-courses',
    route: OfferedCourseRoutes,
  },
  {
    path: '/auth',
    route: AuthRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
