"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const responseHelper_1 = require("./responseHelper");
const errorHandler = (res, error) => {
    console.log(error);
    if ((error === null || error === void 0 ? void 0 : error.status) === 401) {
        (0, responseHelper_1.UNAUTHORIZE)(res, error.message);
    }
    else if ((error === null || error === void 0 ? void 0 : error.status) === 400) {
        (0, responseHelper_1.BAD_REQUEST)(res, error.message);
    }
    else {
        (0, responseHelper_1.INTERNAL_ERROR)(res, error.message);
    }
};
exports.default = errorHandler;
//# sourceMappingURL=errorHandler.js.map