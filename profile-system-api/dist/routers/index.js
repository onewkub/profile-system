"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_controller_1 = __importDefault(require("../controllers/auth.controller"));
const validateModel_1 = __importDefault(require("../middleware/validateModel"));
const verifyToken_1 = __importDefault(require("../middleware/verifyToken"));
const register_validation_1 = __importDefault(require("../validations/register.validation"));
const authRouter_1 = __importDefault(require("./authRouter"));
const router = (0, express_1.Router)();
router.get('/hello', (_, res) => res.json('Hello there!!'));
router.post('/login', auth_controller_1.default.login);
router.post('/register', (0, validateModel_1.default)(register_validation_1.default), auth_controller_1.default.register);
router.get('/verify-token', verifyToken_1.default, auth_controller_1.default.verifyToken);
router.use(verifyToken_1.default, authRouter_1.default);
exports.default = router;
//# sourceMappingURL=index.js.map