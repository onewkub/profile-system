import { Router } from 'express'
import authController from '../controllers/auth.controller'
import validateModel from '../middleware/validateModel'
import verifyToken from '../middleware/verifyToken'
import registerValidation from '../validations/register.validation'
import authRouter from './authRouter'

const router = Router()

router.get('/hello', (_, res) => res.json('Hello there!!'))

router.post('/login', authController.login)

router.post(
    '/register',
    validateModel(registerValidation),
    authController.register
)

router.get('/verify-token', verifyToken, authController.verifyToken)

router.use(verifyToken, authRouter)
export default router
