import { Schema, model } from "mongoose";
import { TOrder } from "../interfaces.ts/orderInterfaces";




const orderSchema = new Schema<TOrder>({
    email: {
        type: String,
        required: true,
    }, 
    productId: {
        type: String, 
        required: true
    }, 
    quantity: {
        type:Number, 
        required: true
    }, 
    price: {
        type: Number, 
        required: true
    }
})



export const OrderModel = model<TOrder>("Order", orderSchema);