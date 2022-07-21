"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = require("lodash");
const db_1 = __importDefault(require("../db"));
const passwordHelper_1 = __importDefault(require("../utils/passwordHelper"));
const getUser = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield db_1.default.user.findUnique({
            where: {
                userId,
            },
            select: {
                username: true,
                userId: true,
                userProfile: true,
            },
        });
        return result;
    }
    catch (error) {
        throw error;
    }
});
const updateUser = (userId, payload) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userProfile } = payload, user = __rest(payload, ["userProfile"]);
        const { password } = user, userOutline = __rest(user, ["password"]);
        let result;
        if (!(0, lodash_1.isEmpty)(password)) {
            // update password
            // validate five latest password change
            const passwordChangeHistory = yield db_1.default.passwordChangingHistory.findMany({
                orderBy: {
                    createAt: 'desc',
                },
                take: 5,
            });
            const hashPassword = yield passwordHelper_1.default.hashPassword(password);
            if (passwordChangeHistory.some((i) => __awaiter(void 0, void 0, void 0, function* () { return yield passwordHelper_1.default.matchPassword(i.oldPassword, password); }))) {
                throw {
                    status: 400,
                    message: 'New Password duplicate with five latest password.',
                };
            }
            else {
                const currentUser = yield db_1.default.user.findFirst({
                    where: {
                        userId,
                    },
                });
                console.log();
                if (currentUser) {
                    const rlt = yield db_1.default.$transaction([
                        db_1.default.passwordChangingHistory.create({
                            data: {
                                userId: (currentUser === null || currentUser === void 0 ? void 0 : currentUser.userId) || '',
                                oldPassword: (currentUser === null || currentUser === void 0 ? void 0 : currentUser.password) || '',
                                newPassword: hashPassword,
                            },
                        }),
                        db_1.default.user.update({
                            data: Object.assign(Object.assign({ password: hashPassword }, userOutline), { userProfile: {
                                    update: {
                                        firstName: userProfile.firstName,
                                        lastName: userProfile.lastName,
                                        profileImage: userProfile.profileImage,
                                    },
                                } }),
                            where: {
                                userId,
                            },
                        }),
                    ]);
                    result = rlt[0];
                }
                else {
                    throw { status: 400, message: 'not found exist record' };
                }
            }
        }
        else {
            result = yield db_1.default.user.update({
                data: Object.assign(Object.assign({}, userOutline), { userProfile: {
                        update: {
                            firstName: userProfile.firstName,
                            lastName: userProfile.lastName,
                            profileImage: userProfile.profileImage,
                        },
                    } }),
                where: {
                    userId,
                },
            });
        }
        return result;
    }
    catch (error) {
        throw error;
    }
});
const userService = { getUser, updateUser };
exports.default = userService;
//# sourceMappingURL=user.service.js.map