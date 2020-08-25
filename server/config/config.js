import dotenv from "dotenv";

process.env.NODE_ENV === undefined
  ? dotenv.config({ path: "./dev.env" })
  : dotenv.config();

export default {
  PORT: process.env.PORT,
  MONGO_URI: process.env.MONGO_URI,
  COOKIE_EXPIRATION_MS: process.env.COOKIE_EXPIRATION_MS,
  SESSION_COOKIE_NAME: process.env.SESSION_COOKIE_NAME,
  SECRET_KEY: process.env.SECRET_KEY,
  SECRET_SESSION_NAME: process.env.SECRET_SESSION_NAME,
  JWT_SECRET: process.env.JWT_SECRET,
  PAYPAL_CLIENT_ID: process.env.PAYPAL_CLIENT_ID || "sb",
  accessKeyId: process.env.accessKeyId || "accessKeyId",
  secretAccessKey: process.env.secretAccessKey || "secretAccessKey"
};
