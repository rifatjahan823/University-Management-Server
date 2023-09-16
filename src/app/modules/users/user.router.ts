import express from 'express';
import { controller } from './user.controller';
import { userValidation } from './user.validation';
import validateRequests from '../../middlewares/validateRequest';

const router = express.Router();

router.post(
  '/create-student',
  validateRequests(userValidation.createUserZodShema),
  controller.creteControllerStudent,
);
router.post(
  '/create-faculty', validateRequests(userValidation.createFacultyZodShema),controller.creteControllerFaculty,
);
router.post(
  '/create-admin',validateRequests(userValidation.createAdminZodShema),controller.creteControllerAdmin,
);

export const userRoutes = { router };
