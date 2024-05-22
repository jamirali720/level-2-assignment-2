import { TProduct } from "../interfaces.ts/productInterfaces";
import ProductModel from "../model.ts/productModel";

const createNewProduct = async (ProductData: TProduct) => {
  return await ProductModel.create(ProductData);
};
const getAllProducts = async (query:object) => {
  return await ProductModel.find({query});
};

const getSingleProductById = async (_id: string) => {
  return await ProductModel.findById({ _id });
};

const updateProductById = async (_id: string, updates: object) => {
  return await ProductModel.findByIdAndUpdate({ _id }, {
    $set: {}
  }, {
    new: true,
    upsert: true,
    runValidators: true,
  });
};

const deleteProductById = async (_id: string) => {
  return await ProductModel.findByIdAndDelete({ _id });
};

export const services = {
  createNewProduct,
  getAllProducts,
  getSingleProductById,
  updateProductById,
  deleteProductById,
};
