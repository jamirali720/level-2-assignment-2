"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.successResponse = void 0;
const successResponse = (res, { message = "success", data = {} || null }) => {
    res.json({
        success: true,
        message,
        data,
    });
};
exports.successResponse = successResponse;
