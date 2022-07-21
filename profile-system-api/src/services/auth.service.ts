import db from '../db'
import loginPayload from '../model/loginPayload'
import userPayload from '../model/userPayload'
import passwordHelper from '../utils/passwordHelper'
import { isNil } from 'lodash'
import jwt from 'jsonwebtoken'

const register = async (payload: userPayload) => {
    try {
        const { userProfile, ...user } = payload
        const hashedPassword = await passwordHelper.hashPassword(user.password)
        const result = await db.user.create({
            data: {
                ...user,
                password: hashedPassword,
                userProfile: {
                    create: {
                        ...userProfile,
                    },
                },
            },
            include: {
                userProfile: true,
            },
        })
        return result
    } catch (error) {
        throw error
    }
}

const login = async (payload: loginPayload) => {
    const JWT_SECRET = process.env.JWT_SECRET || ('JWT_SECRET' as string)

    const { username, password } = payload
    const user = await db.user.findFirst({
        where: {
            username: username,
        },
    })

    if (!isNil(user)) {
        const { password: userPassword, ...res } = user
        const match = await passwordHelper.matchPassword(password, userPassword)
        if (match) {
            const payload = {
                ...res,
            }
            const token = jwt.sign(payload, JWT_SECRET, {
                expiresIn: '30d',
            })
            return {
                token: `${token}`,
            }
        } else {
            throw { status: 401, message: 'Username or password is invalid.' }
        }
    } else {
        throw { status: 401, message: 'Username or password is invalid.' }
    }
}

const authService = { register, login }

export default authService
