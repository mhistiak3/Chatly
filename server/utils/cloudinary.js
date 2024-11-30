import cloudinary from "../config/cloudinary.config.js";
import { v4 as uuid } from "uuid";
import { getBase64 } from "./helper.js";
const uploadToCloudinary = async (files = []) => {
  try {
    if (!files.length) return;
    // upload to cloudinary
    const uploadPromises = files.map((file) => {
      return new Promise((resolve, reject) => {
        cloudinary.uploader.upload(
         getBase64(file),
          {
            resource_type: "auto",
            public_id: uuid(),
          },
          (error, result) => {
            if (error) return reject(error);
            resolve(result);
          }
        );
      });
    });

    const results = await Promise.all(uploadPromises);
    console.log(results);
    
    return results;
  } catch (error) {
    console.log("Error uploading: " + error.message);
    throw error;
  }
};
const deleteFromCloudinary = async (publicIds) => {
  console.log(publicIds);
};
export { deleteFromCloudinary, uploadToCloudinary };
