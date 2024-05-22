import { Request, Response } from "express";
import orderSchemaValidation from "../validation.ts/orderValidation";
import ProductModel from "../model.ts/productModel";
import { OrderModel } from "../model.ts/orderModel";
import { successResponse } from "../helper.ts/successResponse";


class OrderController {
    //create new order and save to database
    handleCreateNewOrder =async(req:Request, res:Response) => {
        const { productId, quantity} = req.body;
        try {
            const validation = orderSchemaValidation.safeParse(req.body)
  
            if (typeof validation.error !== "undefined" &&  validation.error.name === 'ZodError') {
                const errorLists = validation.error.issues.map((err) => err.message);
                return res.status(500).json({
                  success: false,
                  message:  errorLists,                  
                });
              }
            
            
            return successResponse(res, {message: "Order created successfully", data: newOrder})

        } catch (error:any) {
            return res.status(500).json({
                success: false,
                error : error.message,                  
              });
        }
    }
}


export const orderController = new OrderController();