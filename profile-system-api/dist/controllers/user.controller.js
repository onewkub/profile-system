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
const user_service_1 = __importDefault(require("../services/user.service"));
const errorHandler_1 = __importDefault(require("../utils/errorHandler"));
const responseHelper_1 = require("../utils/responseHelper");
const getCurrentUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = req.user;
        const result = yield user_service_1.default.getUser(user.userId);
        (0, responseHelper_1.OK)(res, result);
    }
    catch (error) {
        (0, errorHandler_1.default)(res, error);
    }
});
const getUserById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.params.userId;
        const result = yield user_service_1.default.getUser(userId);
        (0, responseHelper_1.OK)(res, result);
    }
    catch (error) {
        (0, errorHandler_1.default)(res, error);
    }
});
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const payload = req.body;
        const userId = req.params.userId;
        const result = yield user_service_1.default.updateUser(userId, payload);
        (0, responseHelper_1.OK)(res, result);
    }
    catch (error) {
        (0, errorHandler_1.default)(res, error);
    }
});
const userController = {
    getCurrentUser,
    getUserById,
    updateUser,
};
exports.default = userController;
//# sourceMappingURL=user.controller.js.map