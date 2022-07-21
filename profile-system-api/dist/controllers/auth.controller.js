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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const auth_service_1 = __importDefault(require("../services/auth.service"));
const responseHelper_1 = require("../utils/responseHelper");
const errorHandler_1 = __importDefault(require("../utils/errorHandler"));
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const payload = req.body;
        const result = yield auth_service_1.default.register(payload);
        (0, responseHelper_1.OK)(res, result);
    }
    catch (error) {
        (0, errorHandler_1.default)(res, error);
    }
});
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const payload = req.body;
        const result = yield auth_service_1.default.login(payload);
        (0, responseHelper_1.OK)(res, result);
    }
    catch (error) {
        (0, errorHandler_1.default)(res, error);
    }
});
const verifyToken = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = {
            message: 'OK',
        };
        (0, responseHelper_1.OK)(res, result);
    }
    catch (error) {
        (0, errorHandler_1.default)(res, error);
    }
});
const authController = { register, login, verifyToken };
exports.default = authController;
//# sourceMappingURL=auth.controller.js.map