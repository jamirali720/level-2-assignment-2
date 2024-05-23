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
exports.services = void 0;
const productModel_1 = __importDefault(require("../model.ts/productModel"));
const createNewProduct = (ProductData) => __awaiter(void 0, void 0, void 0, function* () {
    return yield productModel_1.default.create(ProductData);
});
const getProducts = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const searchTerm = new RegExp(".*" + query + ".*", "i");
    // query products by name filed/ description field/ category field;
    const queryFilter = {
        $or: [
            { name: { $regex: searchTerm } },
            { description: { $regex: searchTerm } },
            { category: { $regex: searchTerm } },
        ],
    };
    const options = { _id: 0, __v: 0 }; // _id and __v do not show
    return yield productModel_1.default.find(queryFilter, options);
});
const getSingleProductById = (_id) => __awaiter(void 0, void 0, void 0, function* () {
    const options = { _id: 0, __v: 0 }; // _id and __v do not show
    return yield productModel_1.default.findById({ _id }, options);
});
const updateProductById = (_id, updates) => __awaiter(void 0, void 0, void 0, function* () {
    return yield productModel_1.default.findByIdAndUpdate({ _id }, { $set: updates }, { new: true, runValidators: true });
});
const deleteProductById = (_id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield productModel_1.default.findByIdAndDelete({ _id });
});
exports.services = {
    createNewProduct,
    getProducts,
    getSingleProductById,
    updateProductById,
    deleteProductById,
};
