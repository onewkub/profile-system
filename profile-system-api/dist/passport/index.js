"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const passport_1 = __importDefault(require("passport"));
const passport_jwt_1 = require("passport-jwt");
const JWT_SECRET = process.env.JWT_SECRET || 'JWT_SECRET';
const opts = {
    jwtFromRequest: passport_jwt_1.ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: JWT_SECRET,
};
passport_1.default.use(new passport_jwt_1.Strategy(opts, (jwt_payload, done) => {
    done(null, jwt_payload);
}));
exports.default = passport_1.default;
//# sourceMappingURL=index.js.map