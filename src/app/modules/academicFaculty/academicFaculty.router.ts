import express from 'express';
import { facultyController } from './academicFaculty.controller';
import { facultyValidation } from './academicFaculty.validation';
import validateRequests from '../../middlewares/validateRequest';
const router = express.Router();

router.post(
  '/create-faculty',
  validateRequests(facultyValidation.academicFacultyZodSchema),
  facultyController.createFaculty,
);

router.patch(
  '/:id',
  validateRequests(facultyValidation.academicFacultyUpdateZodSchema),
  facultyController.updateFaculty,
);

router.get('/getAllFaculty', facultyController.getAllFaculty);

router.get('/:id', facultyController.getsingleFaculty);

router.delete('/:id', facultyController.deleteFaculty);

export const facultyRouter = { router };
