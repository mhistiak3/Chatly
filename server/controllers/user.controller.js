import { compare } from "bcrypt";
import { JWT_VALID_TIME } from "../config/config.js";
import User from "../models/user.model.js";
import customErrorHandler, {
  TryCatch,
} from "../services/custom.error.handler.js";
import { createToken } from "../utils/token.handler.js";

// Create user and save it to database and set cookie
export const registerController = TryCatch(async (req, res) => {
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

  // register user
  const newUser = await User.create({
    name,
    username,
    bio,
    password,
    avatar,
  });
  // create token
  const token = createToken(newUser._id);

  // send response
  res
    .status(201)
    .cookie("chatly-token", token, {
      maxAge: Number(JWT_VALID_TIME),
      sameSite: "none",
      httpOnly: true,
    })
    .json({
      success: true,
      message: "User register success",
      token,
    });
});
// login user
export const loginController = TryCatch(async (req, res) => {
  const { username, password } = req.body;
  // check if user is exist
  const isUser = await User.findOne({ username }).select("_id password");
  if (!isUser) {
    return customErrorHandler(res, "User not found", 404);
  }
  // compare password
  const isPasswordMatch = await compare(String(password), isUser.password);
  if (!isPasswordMatch) {
    return customErrorHandler(res, "Password not match", 401);
  }
  const token = createToken(isUser._id);
  res
    .status(200)
    .cookie("chatly-token", token, {
      maxAge: Number(JWT_VALID_TIME), // 15 days in
      sameSite: "none",
      httpOnly: true,
    })
    .json({
      success: true,
      message: "User login success",
      token,
    });
});

// get profile
export const profileController = TryCatch(async (req, res) => {
  const user = await User.findById(req.userId).select("-password");
  if (!user) {
    return customErrorHandler(res, "User not found", 404);
  }
  res.status(200).json({ success: true, user });
});

// logout
export const logoutController = TryCatch(async (req, res) => {
  res
    .status(200)
    .clearCookie("chatly-token", {
      sameSite: "none",
      httpOnly: true,
    })
    .json({ success: true, message: "User logout success" });
});

// search user
export const searchUserController = TryCatch(async (req, res) => {
  const { name } = req.query;

  // response
  res.status(200).json({ success: true, user: name });
});