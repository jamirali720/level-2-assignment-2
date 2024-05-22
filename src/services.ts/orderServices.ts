import { Response } from "express";
import { TOrder } from "../interfaces.ts/orderInterfaces";
import ProductModel from "../model.ts/productModel";
import { OrderModel } from "../model.ts/orderModel";

export const createNewOrderService = async (orderData: TOrder) => {
  return await OrderModel.create(orderData);
};

export const getOrdersService = async (query: string | undefined) => {  
  const filter = query  ?  {email: query}  : {}  
  return await OrderModel.find(filter);
};
