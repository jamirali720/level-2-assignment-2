"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleError = void 0;
const handleError = (err, req, res, next) => {
    let message;
    if (err instanceof Error) {
        message = err.message;
    }
    else if (typeof err === "string") {
        message = err;
    }
    else {
        message = "Internal Server Error";
    }
    res.status(500).json({
        success: false,
        message,
    });
};
exports.handleError = handleError;
