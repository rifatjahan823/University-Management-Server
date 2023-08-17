import express from 'express'
import { controller } from './user.controller'
import { userValidation } from './user.validation'
import validateRequests from '../../middlewares/validateRequest'

const router = express.Router()

router.post('/create-user',validateRequests(userValidation.createUserZodShema),controller.creteControllerUser)

export const userRoutes = { router }
