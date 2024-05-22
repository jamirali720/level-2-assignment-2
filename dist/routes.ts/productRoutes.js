"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const productController_1 = require("../controller.ts/productController");
const productRouter = express_1.default.Router();
productRouter.route("/").post(productController_1.productController.handleCreateNewProduct);
productRouter.route("/").get(productController_1.productController.handleGetProducts);
productRouter
    .route("/:productId")
    .get(productController_1.productController.handleGetSingleProductById);
productRouter
    .route("/:productId")
    .put(productController_1.productController.handleUpdateProductById);
productRouter
    .route("/:productId")
    .delete(productController_1.productController.handleDeleteProductById);
exports.default = productRouter;
