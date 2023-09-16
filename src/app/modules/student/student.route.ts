import express from 'express';
import { StudentController } from './student.controller';
import validateRequests from '../../middlewares/validateRequest';
import { studentValidation } from './student.validation';

const router = express.Router();

router.patch(
  '/:id',
  validateRequests(studentValidation.updateStudentZodShema),
  StudentController.updateStudent,
);
router.get('/:id', StudentController.getSingleStudent);
router.get('/', StudentController.getAllStudents);
router.delete('/:id', StudentController.deleteStudent);

export const studentRoutes = { router };
