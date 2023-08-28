import express from 'express';
import validateRequests from '../../middlewares/validateRequest';
import { AcademicController } from './academicSemester.controller';
import academicSemesterValidation from './academicSemester.validation';

const router = express.Router();

router.post(
  '/create-academicSemester',
  validateRequests(academicSemesterValidation.academicSemesterZodSchema),
  AcademicController.academicController,
);

router.patch('/:id',validateRequests(academicSemesterValidation.updateSemesterZodSchema),AcademicController.updateSemester)

router.get('/',AcademicController.getAllSemester)

router.get('/:id',AcademicController.getSingleSemester)

router.delete('/:id',AcademicController.deleteSemester)





export const academicRouter = { router };
