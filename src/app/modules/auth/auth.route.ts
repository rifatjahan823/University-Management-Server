import express from 'express'
import validateRequests from '../../middlewares/validateRequest'
import { authValidation } from './auth.validation'
import { authController } from './auth.controller'

const router = express.Router()

router.post('/login',validateRequests(authValidation.loginZodSchema),authController.loginUser)
router.post('/refresh-token',validateRequests(authValidation.refreshTokenZodSchema),authController.refreshToken)
router.post('/change-password',validateRequests(authValidation.changePasswordZodSchema),authController.changePassword)

export const authRoutes={router}