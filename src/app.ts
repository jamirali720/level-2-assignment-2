import express, { Application, Request, Response } from "express";
import productRouter from "./app/routes.ts/productRoutes";
import orderRouter from "./app/routes.ts/orderRoutes";

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
app.use((err:Error, req:Request, res:Response) => {
      let message;
      if (err instanceof Error) {
        message = err.message;
      } else if (typeof err === "string") {
        message = err;
      } else {
        message = "Internal Server Error";

      }

      res.status(500).json({
        success: false,
        message,
      });
});

//not found route
app.use((req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

export default app;
