"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.default = {
    port: process.env.PORT,
    databaseUrl: process.env.NODE_ENV === "development"
        ? process.env.MONGODB_LOCAL_DATABASE_URL
        : process.env.MONGODB_PRODUCTION_DATABASE_UR,
};
