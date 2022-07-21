"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const yup = __importStar(require("yup"));
const registerValidation = yup.object({
    username: yup
        .string()
        .required('Username is required')
        .min(4)
        .max(12)
        .matches(/^[A-Za-z0-9_]+$/, {
        message: 'Username should have only A-Z, a-z, 0-9 and _',
    }),
    password: yup
        .string()
        .required('Password is required.')
        .matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/, {
        message: 'Password should have minimum six characters, at least one uppercase letter, one lowercase letter and one number',
    })
        .test((value) => {
        const digitPattern = ['123456', '234567', '345678', '456789'];
        const characterPattern = [
            'abcdef',
            'bcdefg',
            'cdefgh',
            'defghj',
            'efghji',
            'fghjil',
            'ghjilm',
            'hjilmn',
            'jilmno',
            'ilmnop',
            'lmnopq',
            'mnopqr',
            'nopqrs',
            'opqrst',
            'pqrstu',
            'qrstuv',
            'rstuvw',
            'stuvwx',
            'tuvwxy',
            'uvwxyz',
        ];
        if (digitPattern.some((i) => value === null || value === void 0 ? void 0 : value.includes(i)))
            return false;
        else if (characterPattern.some((i) => value === null || value === void 0 ? void 0 : value.includes(i)))
            return false;
        return true;
    }),
    userProfile: yup
        .object({
        firstName: yup.string().required('First name is required.'),
        lastName: yup.string(),
        profileImage: yup.string().required('Profile Image is required.'),
    })
        .required(),
});
exports.default = registerValidation;
//# sourceMappingURL=register.validation.js.map