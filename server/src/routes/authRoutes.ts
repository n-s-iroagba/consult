import express from 'express'

import { AuthController } from '../controllers/AuthController'
import { authMiddleware } from '../middleware/auth'
import { validateBody } from '../middleware/validation'
import {
  forgotPasswordSchema,
  loginSchema,
  registerSchema,
  resendCodeSchema,
  resetPasswordSchema,
  verifyEmailCodeSchema,
} from '../validation/auth.validation'

const router = express.Router()
const authController = new AuthController()

router.post('/signup', validateBody(registerSchema), authController.signUpAdmin)

router.post('/login', validateBody(loginSchema), authController.login)
router.post('/forgot-password', validateBody(forgotPasswordSchema), authController.forgotPassword)
router.post(
  '/reset-password',

  validateBody(resetPasswordSchema),
  authController.resetPassword
)

router.post('/verify-email', validateBody(verifyEmailCodeSchema), authController.verifyEmail)
router.post('/resend-verification-code', validateBody(resendCodeSchema), authController.resendCode)
router.get('/refresh-token', authController.refreshToken)
router.get('/me', authMiddleware, authController.getMe)

export default router
