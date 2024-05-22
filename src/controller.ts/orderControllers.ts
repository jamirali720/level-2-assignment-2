import { Request, Response } from "express";
import orderSchemaValidation from "../validation.ts/orderValidation";
import { successResponse } from "../helper.ts/successResponse";
import { createNewOrderService, getOrdersService } from "../services.ts/orderServices";
import ProductModel from "../model.ts/productModel";

class OrderController {
  //create new order and save to database
  handleCreateNewOrder = async (req: Request, res: Response) => {
    try {
      // zod validation parse
      const validation = orderSchemaValidation.safeParse(req.body);

      // check if zod error
      if (
        typeof validation.error !== "undefined" &&
        validation.error.name === "ZodError"
      ) {
        const errorLists = validation.error.issues.map((err) => err.message);
        return res.status(500).json({
          success: false,
          message: errorLists,
        });
      }

      // check if zod validation success and successful zod data parse
      if (validation.success) {
        let product = await ProductModel.findById(validation.data.productId);

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
          product.inventory.inStock = product.inventory.quantity === 0 ?  false : true ;            

          const newOrder = await createNewOrderService(validation.data);
          await product.save();
          return successResponse(res, {
            message: "Order created successfully",
            data: newOrder,
          });
        }
      }
    } catch (error: any) {
      return res.status(500).json({
        success: false,
        error: error.message,
      });
    }
  };
  handleGetOrders = async( req: Request, res:Response) => {
    const email = req.query.email;
    try {
      
      const orders = await getOrdersService(email as string | undefined)
      
      if(orders.length === 0) {
        return res.status(404).json(
          {
            "success": false,
            "message": "Order not found"
          }
        )
      }

      successResponse(res, {message: "Orders fetched successfully!", data: orders})
      
    } catch (error) {
      
    }
  }
}

export const orderController = new OrderController();
