import express from 'express';
import { userRoutes } from '../app/modules/users/user.router';
import { academicRouter } from '../app/modules/academicSemester.ts/academicSemester.router';
import { facultyRouter } from '../app/modules/academicFaculty/academicFaculty.router';
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
    path:'/faculty',
    router:facultyRouter.router
  }
];

routers.forEach(route => routes.use(route.path, route.router));

export default routes;
