"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const passport_1 = __importDefault(require("../passport"));
const responseHelper_1 = require("../utils/responseHelper");
const verifyToken = (req, res, next) => {
    passport_1.default.authenticate('jwt', { session: false }, (_, user) => {
        if (user) {
            req.user = user;
            next();
        }
        else {
            return (0, responseHelper_1.UNAUTHORIZE)(res, 'Your token is already expired');
        }
    })(req, res);
};
exports.default = verifyToken;
//# sourceMappingURL=verifyToken.js.map