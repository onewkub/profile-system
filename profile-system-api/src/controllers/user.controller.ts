import { user } from '@prisma/client'
import { Request, Response } from 'express'
import userPayload from '../model/userPayload'
import userService from '../services/user.service'
import errorHandler from '../utils/errorHandler'
import { INTERNAL_ERROR, OK } from '../utils/responseHelper'

const getCurrentUser = async (req: Request, res: Response) => {
    try {
        const user = req.user as user
        const result = await userService.getUser(user.userId)
        OK(res, result)
    } catch (error) {
        errorHandler(res, error)
    }
}

const getUserById = async (req: Request, res: Response) => {
    try {
        const userId = req.params.userId as string
        const result = await userService.getUser(userId)
        OK(res, result)
    } catch (error) {
        errorHandler(res, error)
    }
}

const updateUser = async (req: Request, res: Response) => {
    try {
        const payload = req.body as userPayload
        const userId = req.params.userId as string
        const result = await userService.updateUser(userId, payload)
        OK(res, result)
    } catch (error) {
        errorHandler(res, error)
    }
}

const userController = {
    getCurrentUser,
    getUserById,
    updateUser,
}

export default userController
