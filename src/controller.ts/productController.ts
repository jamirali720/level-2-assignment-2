import { Request, Response } from "express";
import { successResponse } from "../helper.ts/successResponse";
import { services } from "../services.ts/productServices";
import productSchemaValidation from "../validation.ts/productValidationWithZod";

class ProductController {
  //create new product and save to database
  handleCreateNewProduct = async (req: Request, res: Response) => {
    try {
      const validation = productSchemaValidation.safeParse(req.body);

      if (
        typeof validation.error !== "undefined" &&
        validation.error.name === "ZodError"
      ) {
        const errorLists = validation.error.issues.map((err) => err.message);
        return res.status(500).json({
          success: false,
          message: "product creation failed" + errorLists,
          error: validation.error,
        });
      }
      if (validation.success) {
        const result = await services.createNewProduct(validation.data);

        return successResponse(res, {
          message: "Product created successfully",
          data: result,
        });
      }
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: error.message,
        error,
      });
    }
  };

  // get all products from database
  handleGetProducts = async (req: Request, res: Response) => {
    // get query value , otherwise initial value empty string
    const query = req.query.searchTerm || "";
    try {
      const products = await services.getProducts(query as string | undefined);
      if (!products) {
        return res.status(404).json({ message: "Products not found" });
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
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
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

    try {
      const product = await services.updateProductById(productId, updatedData);
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
        data: null,
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
