import User from "../models/user.model.js";
import customErrorHandler from "../services/custom.error.handler.js";
import { createToken } from "../utils/token.handler.js";

// Create user and save it to database and set cookie
export const registerController = async (req, res) => {
  try {
    const { name, username, password, bio } = req.body;
    const avatar = {
      public_id: Date.now() + "",
      url: `https://randomuser.me/api/portraits/men/${Math.round(
        Math.random() * 100
      )}.jpg`,
    };

    // check if user is exist
    const isUser = await User.findOne({ username });

    if (isUser && isUser?.username) {
      return customErrorHandler(res, "This user is already exist", 409);
    }

    const newUser = await User.create({
      name,
      username,
      bio,
      password,
      avatar,
    });
    const token = createToken(newUser._id);

    res
      .status(201)
      .cookie("chatly-token", token, {
        maxAge: 15 * 24 * 60 * 60 * 1000,
        sameSite: "none",
        httpOnly: true,
      })
      .json({
        type: "success",
        message: "User register success",
        token,
      });
  } catch (error) {
    console.log("Error to create user: ", error.message);
    customErrorHandler(res, error.message, 500);
  }
};
export const loginController = async (req, res) => {
  try {
  } catch (error) {}
};
