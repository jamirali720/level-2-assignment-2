"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const productRoutes_1 = __importDefault(require("./routes.ts/productRoutes"));
const error_1 = require("./helper.ts/error");
const orderRoutes_1 = __importDefault(require("./routes.ts/orderRoutes"));
const app = (0, express_1.default)();
// express built in middleware
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use("/api/products", productRoutes_1.default);
app.use("/api/orders", orderRoutes_1.default);
// home route
app.get("/", (req, res) => {
    res.send("Hello assignment-2 server");
});
//error handler
app.use((err, req, res, next) => {
    (0, error_1.handleError)(err, res);
});
//not found route
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: "Route not found",
    });
});
exports.default = app;
