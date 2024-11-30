import dotenv from "dotenv"
dotenv.config()
export const {
  APP_PORT,
  MONGO_DB_URI,
  JWT_SECRET,
  JWT_VALID_TIME,
  ADMIN_SECRET_KEY,
  CLIENT_URL,
  CLOUDINARY_CLOUD_NAME,
  CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET,
} = process.env;