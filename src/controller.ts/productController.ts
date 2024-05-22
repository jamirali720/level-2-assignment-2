import { Request, Response } from "express";
import { successResponse } from "../helper.ts/successResponse";
import { services } from "../services.ts/productServices";
import productSchemaValidation from "../validation.ts/productValidationWithZod";

class ProductController {
  //create new product and save to database
  handleCreateNewProduct = async (req: Request, res: Response) => {   
    try {
     const validate =  productSchemaValidation.safeParse(req.body)
    
     if (typeof validate.error !== "undefined" &&  validate.error.name === 'ZodError') {
        const errorLists = validate.error.issues.map((err) => err.message);
        return res.status(500).json({
          success: false,
          message: 'product creation failed' + errorLists,
          error: validate.error,
        });
      }
      const result = await services.createNewProduct(req.body);
     
      return successResponse(res, {
        message: "Product created successfully",
        data: result,
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: error.message,
        error,
      });
    }
  };

  // get all products from database
  handleGetAllProducts = async (req: Request, res: Response) => {
    const query =  req.query
    try {
      const products = await services.getAllProducts(query);
      if(!products) {
        return res.status(404).json({message: "Products not found"})
      }
      return successResponse(res, {
        message: "Products fetched successfully!",
        data: products,
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: error.message,
        error,
      });
    }
  };

  // get single product from database by product ID
  handleGetSingleProductById = async (req: Request, res: Response) => {
    const { productId } = req.params;
    try {
      const product = await services.getSingleProductById(productId);
      if(!product){
        return res.status(404).json({message: "Product not found"})
      }
      return successResponse(res, {
        message: "Product fetched successfully",
        data: product,
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: error.message,
        error,
      });
    }
  };

  // update a product by ID 
  handleUpdateProductById = async (req: Request, res: Response) => {
    const { productId } = req.params;
    const updatedData = req.body;
    console.log(updatedData);
    try {
      const product = await services.updateProductById (productId, updatedData);
      return successResponse(res, {
        message: "Product updated successfully",
        data: product,
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: error.message,
        error,
      });
    }
  };


 

 // delete a product from database by product ID
  handleDeleteProductById = async (req: Request, res: Response) => {
    const { productId } = req.params;
    try {
      await services.deleteProductById(productId);
      return successResponse(res, {
        message: "Product deleted successfully",
        data:null
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: error.message,
        error,
      });
    }
  };
}

export const productController = new ProductController();
