"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const orderControllers_1 = require("../controller.ts/orderControllers");
const orderRouter = express_1.default.Router();
orderRouter.route("/").post(orderControllers_1.orderController.handleCreateNewOrder);
orderRouter.route("/").get(orderControllers_1.orderController.handleGetOrders);
exports.default = orderRouter;
