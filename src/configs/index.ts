import dotenv from "dotenv";

dotenv.config();

export default {
  port: process.env.PORT,
  databaseUrl:
    process.env.NODE_ENV === "development"
      ? process.env.MONGODB_LOCAL_DATABASE_URL
      : process.env.MONGODB_PRODUCTION_DATABASE_UR,
};
