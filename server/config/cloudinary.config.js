/*
 * Title: Cloudinary Config
 * Description: Configure Cloudinary in Chatly Project
 * Author: Istiak Ahammad
 * Date: 8/20/2024
 *
 */

/**
 *  node module
 **/
import {v2 as cloudinary} from "cloudinary";

import {
  CLOUDINARY_CLOUD_NAME,
  CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET,
} from "./config.js"

/**
 *  Configure Cloudinary settings for image uploads.
 **/
cloudinary.config({
  cloud_name: CLOUDINARY_CLOUD_NAME,
  api_key: CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY_API_SECRET,
});

export default cloudinary;
