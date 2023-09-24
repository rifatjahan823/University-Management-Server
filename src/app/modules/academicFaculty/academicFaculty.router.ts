import express from 'express';
import { facultyController } from './academicFaculty.controller';
import { facultyValidation } from './academicFaculty.validation';
import validateRequests from '../../middlewares/validateRequest';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
const router = express.Router();

router.post(
  '/create-faculty',
  validateRequests(facultyValidation.academicFacultyZodSchema),auth(ENUM_USER_ROLE.ADMIN,ENUM_USER_ROLE.SUPER_ADMIN),
  facultyController.createFaculty,
);

router.patch(
  '/:id',auth(ENUM_USER_ROLE.ADMIN,ENUM_USER_ROLE.FACULTY,ENUM_USER_ROLE.SUPER_ADMIN), 
  validateRequests(facultyValidation.academicFacultyUpdateZodSchema),
  facultyController.updateFaculty,
);

router.get('/getAllFaculty',auth(ENUM_USER_ROLE.ADMIN,ENUM_USER_ROLE.FACULTY,ENUM_USER_ROLE.STUDENT,ENUM_USER_ROLE.SUPER_ADMIN), facultyController.getAllFaculty);

router.get('/:id', facultyController.getsingleFaculty);

router.delete('/:id',auth(ENUM_USER_ROLE.ADMIN,ENUM_USER_ROLE.SUPER_ADMIN),  facultyController.deleteFaculty);

export const facultyRouter = { router };
