import dotenv from "dotenv"
dotenv.config()
export const { APP_PORT, MONGO_DB_URI, JWT_SECRET } = process.env;