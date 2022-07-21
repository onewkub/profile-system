import { Request, Response } from 'express'
import loginPayload from '../model/loginPayload'
import userPayload from '../model/userPayload'
import authService from '../services/auth.service'
import {    OK } from '../utils/responseHelper'
import errorHandler from '../utils/errorHandler'

const register = async (req: Request, res: Response) => {
    try {
        const payload = req.body as userPayload
        const result = await authService.register(payload)
        OK(res, result)
    } catch (error) {
        errorHandler(res, error)
    }
}

const login = async (req: Request, res: Response) => {
    try {
        const payload = req.body as loginPayload
        const result = await authService.login(payload)
        OK(res, result)
    } catch (error) {
        errorHandler(res, error)
    }
}

const verifyToken = async (req: Request, res: Response) => {
    try {
        const result = {
            message: 'OK',
        }
        OK(res, result)
    } catch (error) {
        errorHandler(res, error)
    }
}

const authController = { register, login, verifyToken }

export default authController
