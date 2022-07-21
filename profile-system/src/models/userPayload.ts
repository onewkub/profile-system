import { user, userProfile } from ".";

interface userPayload extends user {
    userProfile: userProfile;
}

export default userPayload;
