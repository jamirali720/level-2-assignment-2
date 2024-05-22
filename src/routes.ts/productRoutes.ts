import express from "express";
import { productController } from "../controller.ts/productController";

const productRouter = express.Router();

productRouter
  .route("/")
  .post(productController.handleCreateNewProduct);

productRouter
  .route("/:productId")
  .get(productController.handleGetSingleProductById);

productRouter
  .route("/:productId")
  .put(productController.handleUpdateProductById);
productRouter
  .route("/:productId")
  .delete(productController.handleDeleteProductById);

export default productRouter;
