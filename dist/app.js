"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
// express built in middleware
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// home route
app.get("/", (req, res) => {
    res.send("Hello assignment-2 server");
});
//error handler 
app.use((err, req, res, next) => {
    res.status(500).json({
        success: false,
        message: err.message || "Internal Server Error",
    });
});
//not found route
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: "Route not found",
    });
});
exports.default = app;
