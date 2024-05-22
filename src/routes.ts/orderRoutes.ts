import express from 'express'
import { orderController } from '../controller.ts/orderControllers';


const orderRouter = express.Router();

orderRouter.route('/').post(orderController.handleCreateNewOrder);

export default orderRouter; 