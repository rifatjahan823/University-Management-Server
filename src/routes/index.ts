import express from 'express';
import { userRoutes } from '../app/modules/users/user.router';
import { academicRouter } from '../app/modules/academicSemester.ts/academicSemester.router';
import { facultyRouter } from '../app/modules/academicFaculty/academicFaculty.router';
import { AcademicDepartmentRoutes } from '../app/modules/academicDepartment/academicDepartment.router';
import { studentRoutes } from '../app/modules/student/student.route';
import { authRoutes } from '../app/modules/auth/auth.route';
const routes = express.Router();

const routers = [
  {
    path: '/user',
    router: userRoutes.router,
  },
  {
    path: '/academic',
    router: academicRouter.router,
  },
  {
    path: '/faculty',
    router: facultyRouter.router,
  },
  {
    path: '/academic-departments',
    router: AcademicDepartmentRoutes.router,
  },
  {
    path: '/students',
    router: studentRoutes.router,
  },
  {
    path:'/auth',
    router:authRoutes.router
  }
];

routers.forEach(route => routes.use(route.path, route.router));

export default routes;
