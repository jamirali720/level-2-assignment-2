"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleError = void 0;
const handleError = (err, res) => {
    let message;
    if (err instanceof Error) {
        message = err.message;
    }
    else if (err && typeof err === "object" && "message" in err) {
        message = String(err.message);
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
