import { isEmpty } from 'lodash'
import db from '../db'
import userPayload from '../model/userPayload'
import passwordHelper from '../utils/passwordHelper'

const getUser = async (userId: string) => {
    try {
        const result = await db.user.findUnique({
            where: {
                userId,
            },

            select: {
                username: true,
                userId: true,
                userProfile: true,
            },
        })

        return result
    } catch (error) {
        throw error
    }
}

const updateUser = async (userId: string, payload: userPayload) => {
    try {
        const { userProfile, ...user } = payload
        const { password, ...userOutline } = user
        let result
        if (!isEmpty(password)) {
            // update password
            // validate five latest password change
            const passwordChangeHistory =
                await db.passwordChangingHistory.findMany({
                    orderBy: {
                        createAt: 'desc',
                    },
                    take: 5,
                })
            const hashPassword = await passwordHelper.hashPassword(password)
            if (
                passwordChangeHistory.some(
                    async (i) => await passwordHelper.matchPassword(i.oldPassword, password)
                )
            ) {
                throw {
                    status: 400,
                    message:
                        'New Password duplicate with five latest password.',
                }
            } else {
                const currentUser = await db.user.findFirst({
                    where: {
                        userId,
                    },
                })
                console.log()
                if (currentUser) {
                    const rlt = await db.$transaction([
                        db.passwordChangingHistory.create({
                            data: {
                                userId: currentUser?.userId || '',
                                oldPassword: currentUser?.password || '',
                                newPassword: hashPassword,
                            },
                        }),
                        db.user.update({
                            data: {
                                password: hashPassword,
                                ...userOutline,
                                userProfile: {
                                    update: {
                                        firstName: userProfile.firstName,
                                        lastName: userProfile.lastName,
                                        profileImage: userProfile.profileImage,
                                    },
                                },
                            },
                            where: {
                                userId,
                            },
                        }),
                    ])
                    result = rlt[0]
                } else {
                    throw { status: 400, message: 'not found exist record' }
                }
            }
        } else {
            result = await db.user.update({
                data: {
                    ...userOutline,
                    userProfile: {
                        update: {
                            firstName: userProfile.firstName,
                            lastName: userProfile.lastName,
                            profileImage: userProfile.profileImage,
                        },
                    },
                },
                where: {
                    userId,
                },
            })
        }
        return result
    } catch (error) {
        throw error
    }
}

const userService = { getUser, updateUser }

export default userService
