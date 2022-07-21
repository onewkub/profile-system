"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BAD_REQUEST = exports.UNAUTHORIZE = exports.OK = exports.INTERNAL_ERROR = void 0;
const INTERNAL_ERROR = (res, error) => {
    res.status(500).json({
        type: 'internal.error',
        error: error.message,
    });
};
exports.INTERNAL_ERROR = INTERNAL_ERROR;
const OK = (res, result) => {
    res.json(result);
};
exports.OK = OK;
const UNAUTHORIZE = (res, message = 'Not have permission') => {
    res.status(401).json({
        type: 'unauthorized',
        message,
    });
};
exports.UNAUTHORIZE = UNAUTHORIZE;
const BAD_REQUEST = (res, message = 'Bad request') => {
    res.status(400).json({
        type: 'bad_request',
        message,
    });
};
exports.BAD_REQUEST = BAD_REQUEST;
//# sourceMappingURL=responseHelper.js.map