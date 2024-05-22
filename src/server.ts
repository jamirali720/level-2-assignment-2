import mongoose from "mongoose";
import app from "./app";
import configs from "./configs/";

const databaseConnection = async () => {
  try {
    await mongoose.connect(configs.databaseUrl as string);
    console.log("Database connected successfully");
    app.listen(configs.port, () => {
      console.log(
        `My assignment-2 server is running on port http://localhost:${configs.port}`,
      );
    });
  } catch (error) {
    console.error(error);
  }
};

databaseConnection();
