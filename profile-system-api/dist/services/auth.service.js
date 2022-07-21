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
const db_1 = __importDefault(require("../db"));
const passwordHelper_1 = __importDefault(require("../utils/passwordHelper"));
const lodash_1 = require("lodash");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const register = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userProfile } = payload, user = __rest(payload, ["userProfile"]);
        const hashedPassword = yield passwordHelper_1.default.hashPassword(user.password);
        const result = yield db_1.default.user.create({
            data: Object.assign(Object.assign({}, user), { password: hashedPassword, userProfile: {
                    create: Object.assign({}, userProfile),
                } }),
            include: {
                userProfile: true,
            },
        });
        return result;
    }
    catch (error) {
        throw error;
    }
});
const login = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const JWT_SECRET = process.env.JWT_SECRET || 'JWT_SECRET';
    const { username, password } = payload;
    const user = yield db_1.default.user.findFirst({
        where: {
            username: username,
        },
    });
    if (!(0, lodash_1.isNil)(user)) {
        const { password: userPassword } = user, res = __rest(user, ["password"]);
        const match = yield passwordHelper_1.default.matchPassword(password, userPassword);
        if (match) {
            const payload = Object.assign({}, res);
            const token = jsonwebtoken_1.default.sign(payload, JWT_SECRET, {
                expiresIn: '30d',
            });
            return {
                token: `${token}`,
            };
        }
        else {
            throw { status: 401, message: 'Username or password is invalid.' };
        }
    }
    else {
        throw { status: 401, message: 'Username or password is invalid.' };
    }
});
const authService = { register, login };
exports.default = authService;
//# sourceMappingURL=auth.service.js.map