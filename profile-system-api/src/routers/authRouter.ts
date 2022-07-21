import { Router } from 'express'
import userController from '../controllers/user.controller'

const authRouter = Router()

authRouter.get('/users/current', userController.getCurrentUser)

authRouter.get('/users/:userId', userController.getUserById)
authRouter.put('/users/:userId', userController.updateUser)

export default authRouter
