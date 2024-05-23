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
exports.productController = void 0;
const successResponse_1 = require("../helper.ts/successResponse");
const productServices_1 = require("../services.ts/productServices");
const productValidationWithZod_1 = __importDefault(require("../validation.ts/productValidationWithZod"));
class ProductController {
    constructor() {
        //create new product and save to database
        this.handleCreateNewProduct = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const validation = productValidationWithZod_1.default.safeParse(req.body);
                if (typeof validation.error !== "undefined" &&
                    validation.error.name === "ZodError") {
                    const errorLists = validation.error.issues.map((err) => err.message);
                    return res.status(500).json({
                        success: false,
                        message: "product creation failed" + errorLists,
                        error: validation.error,
                    });
                }
                if (validation.success) {
                    const result = yield productServices_1.services.createNewProduct(validation.data);
                    return (0, successResponse_1.successResponse)(res, {
                        message: "Product created successfully",
                        data: result,
                    });
                }
            }
            catch (error) {
                const err = error;
                res.status(500).json({
                    success: false,
                    message: err.message,
                    error,
                });
            }
        });
        // get all products from database
        this.handleGetProducts = (req, res) => __awaiter(this, void 0, void 0, function* () {
            // get query value , otherwise initial value empty string
            const query = req.query.searchTerm || "";
            try {
                const products = yield productServices_1.services.getProducts(query);
                if (products.length === 0) {
                    return res.status(404).json({ message: "Products not found" });
                }
                return (0, successResponse_1.successResponse)(res, {
                    message: "Products fetched successfully!",
                    data: products,
                });
            }
            catch (error) {
                const err = error;
                res.status(500).json({
                    success: false,
                    message: err.message,
                    error,
                });
            }
        });
        // get single product from database by product ID
        this.handleGetSingleProductById = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { productId } = req.params;
            try {
                const product = yield productServices_1.services.getSingleProductById(productId);
                if (!product) {
                    return res.status(404).json({ message: "Product not found" });
                }
                return (0, successResponse_1.successResponse)(res, {
                    message: "Product fetched successfully",
                    data: product,
                });
            }
            catch (error) {
                const err = error;
                res.status(500).json({
                    success: false,
                    message: err.message,
                    error,
                });
            }
        });
        // update a product by ID
        this.handleUpdateProductById = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { productId } = req.params;
            const updatedData = req.body;
            try {
                const product = yield productServices_1.services.updateProductById(productId, updatedData);
                if (!product) {
                    return res.status(404).json({ message: "Product not updated" });
                }
                return (0, successResponse_1.successResponse)(res, {
                    message: "Product updated successfully",
                    data: product,
                });
            }
            catch (error) {
                const err = error;
                res.status(500).json({
                    success: false,
                    message: err.message,
                    error,
                });
            }
        });
        // delete a product from database by product ID
        this.handleDeleteProductById = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { productId } = req.params;
            try {
                yield productServices_1.services.deleteProductById(productId);
                return (0, successResponse_1.successResponse)(res, {
                    message: "Product deleted successfully",
                    data: "null",
                });
            }
            catch (error) {
                const err = error;
                res.status(500).json({
                    success: false,
                    message: err.message,
                    error,
                });
            }
        });
    }
}
exports.productController = new ProductController();
