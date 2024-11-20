import dotenv from "dotenv"
dotenv.config()
export const { APP_PORT, MONGO_DB_URI, JWT_SECRET, JWT_VALID_TIME, ADMIN_SECRET_KEY } =  process.env;