import { Response } from "express";
import { TOrder } from "../interfaces.ts/orderInterfaces";
import ProductModel from "../model.ts/productModel";
import { OrderModel } from "../model.ts/orderModel";

const createNewOrder =async (res:Response, productId: string, orderData: TOrder) => {
    let product = await ProductModel.findById(productId);

            if (product &&  product.inventory.quantity < orderData.quantity) {
                return res.status(404).json({
                    success: false,
                    message: "Insufficient quantity available in inventory"
                })
            }

            const newOrder = await OrderModel.create(orderData);
            
            if(product &&  newOrder) {
                product.inventory.quantity  = product.inventory.quantity - orderData.quantity;
            }
}