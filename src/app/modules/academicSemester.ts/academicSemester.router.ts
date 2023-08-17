import express from 'express'
import validateRequests from '../../middlewares/validateRequest'
import academicSemesterZodSchema from './academicSemester.validation'
import { AcademicController } from './academicSemester.controller'

const router=express.Router()

router.post('/create-academicSemester',validateRequests(academicSemesterZodSchema),AcademicController.academicController)

export const academicRouter={router}
