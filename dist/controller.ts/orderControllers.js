"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderController = void 0;
const orderValidation_1 = __importDefault(require("../validation.ts/orderValidation"));
const successResponse_1 = require("../helper.ts/successResponse");
const orderServices_1 = require("../services.ts/orderServices");
const productModel_1 = __importDefault(require("../model.ts/productModel"));
class OrderController {
    constructor() {
        //create new order and save to database
        this.handleCreateNewOrder = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                // zod validation parse
                const validation = orderValidation_1.default.safeParse(req.body);
                // check if zod error
                if (typeof validation.error !== "undefined" &&
                    validation.error.name === "ZodError") {
                    const errorLists = validation.error.issues.map((err) => err.message);
                    return res.status(500).json({
                        success: false,
                        message: errorLists,
                    });
                }
                // check if zod validation success and successful zod data parse
                if (validation.success) {
                    const product = yield productModel_1.default.findById(validation.data.productId);
                    // check if order quantity less than product quantity, otherwise show error message
                    if (product && product.inventory.quantity < validation.data.quantity) {
                        return res.status(404).json({
                            success: false,
                            message: "Insufficient quantity available in inventory",
                        });
                    }
                    if (product) {
                        //  product quantity will be reduce from product.inventory.quantity  equal to order quantity;
                        product.inventory.quantity =
                            product.inventory.quantity - validation.data.quantity;
                        // check if product quantity equal 0,  then product.inventory.inStock will be false;
                        product.inventory.inStock =
                            product.inventory.quantity === 0 ? false : true;
                        const newOrder = yield (0, orderServices_1.createNewOrderService)(validation.data);
                        yield product.save();
                        return (0, successResponse_1.successResponse)(res, {
                            message: "Order created successfully",
                            data: newOrder,
                        });
                    }
                }
            }
            catch (error) {
                return res.status(500).json({
                    success: false,
                    error: error.message,
                });
            }
        });
        this.handleGetOrders = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const email = req.query.email;
            try {
                const orders = yield (0, orderServices_1.getOrdersService)(email);
                if (orders.length === 0) {
                    return res.status(404).json({
                        success: false,
                        message: "Order not found",
                    });
                }
                (0, successResponse_1.successResponse)(res, {
                    message: "Orders fetched successfully!",
                    data: orders,
                });
            }
            catch (error) {
                return res.status(500).json({
                    success: false,
                    error: error.message,
                });
            }
        });
    }
}
exports.orderController = new OrderController();
