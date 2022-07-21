/**
 * Model user
 *
 */
export type user = {
    userId?: string;
    username: string;
    password?: string;
    isActive?: boolean;
    createAt?: Date;
    updateAt?: Date;
};

/**
 * Model userProfile
 *
 */
export type userProfile = {
    userProfileId?: string;
    userId?: string;
    firstName: string;
    lastName: string;
    profileImage?: string | null;
    createAt?: Date;
    updateAt?: Date;
};

/**
 * Model passwordChangingHistory
 *
 */
export type passwordChangingHistory = {
    passwordChangingHistory: string;
    userId: string;
    oldPassword: string;
    newPassword: string;
    createAt: Date;
    updateAt: Date;
};
