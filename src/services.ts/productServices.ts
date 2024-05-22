import { TProduct } from "../interfaces.ts/productInterfaces";
import ProductModel from "../model.ts/productModel";

const createNewProduct = async (ProductData: TProduct) => {
  return await ProductModel.create(ProductData);
};
const getProducts = async (query: string | undefined) => {
  const searchTerm = new RegExp(".*" + query + ".*", "i") 

  // query products by name filed/ description field/ category field; 
  const queryFilter = {
    $or: [
      {name: {$regex: searchTerm}}, 
      {description: {$regex: searchTerm}}, 
      {category: {$regex: searchTerm}}, 
    ]
  }  
  const options = {_id: 0, __v: 0} // _id and __v do not show

  return await ProductModel.find(queryFilter, options);
};

const getSingleProductById = async (_id: string) => {
  const options = {_id: 0, __v: 0} // _id and __v do not show
  return await ProductModel.findById({ _id }, options);
};

const updateProductById = async (_id: string, updates: object) => {  
  return await ProductModel.findByIdAndUpdate(
    { _id }, { $set: updates  },{ new: true,  runValidators: true},
  );
};

const deleteProductById = async (_id: string) => {
  return await ProductModel.findByIdAndDelete({ _id });
};

export const services = {
  createNewProduct,
  getProducts,
  getSingleProductById,
  updateProductById,
  deleteProductById,
};
