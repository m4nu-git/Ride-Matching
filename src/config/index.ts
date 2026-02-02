// This file contains all the basic configuration logic for the app server to work
import dotenv from "dotenv";
import jwt from "jsonwebtoken";

type ServerConfig = {
  PORT: number;
  ENV: string;
  JWT_SECRET: jwt.Secret;
  JWT_EXPIRY: jwt.SignOptions["expiresIn"];
  REDIS_HOST: string;
  REDIS_PORT: number;
};

export type DbConfig = {
  DEV_DB_URL: string;
  PROD_DB_URL: string;
}

function loadEnv() {
  dotenv.config();
  console.log(`Environment variables loaded!`);
}

loadEnv();

export const serverConfig: ServerConfig = {
  PORT: Number(process.env.PORT) || 3001,
  ENV: process.env.NODE_ENV || "development",
  JWT_SECRET: process.env.JWT_SECRET || "secret",
  JWT_EXPIRY: process.env.JWT_EXPIRY as jwt.SignOptions["expiresIn"] || "1d",
  REDIS_HOST: process.env.REDIS_HOST || "localhost",
  REDIS_PORT: Number(process.env.REDIS_PORT) || 6379,
};

export const dbConfig: DbConfig = {
  DEV_DB_URL: 
    process.env.DEV_DB_URL || "mongodb://localhost:27017/myRideMatchingDB_dev",
  PROD_DB_URL: 
    process.env.PROD_DB_URL || "mongodb://localhost:27017/myRideMatchingDB_prod"
}
