import { user, userProfile } from '@prisma/client'

interface userPayload extends user {
    userProfile: userProfile
}

export default userPayload
