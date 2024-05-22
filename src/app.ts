import express, { NextFunction, Application, Request, Response } from "express";
import productRouter from "./routes.ts/productRoutes";
import { handleError } from "./helper.ts/error";
import orderRouter from "./routes.ts/orderRoutes";

const app: Application = express();

// express built in middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/products", productRouter);
app.use("/api/orders", orderRouter);
// home route
app.get("/", (req: Request, res: Response) => {
  res.send("Hello assignment-2 server");
});

//error handler
app.use((err: unknown, req: Request, res: Response, next: NextFunction) => {
  handleError(err, res);
});

//not found route
app.use((req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

export default app;
