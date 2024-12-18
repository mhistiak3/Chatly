import mongoose from "mongoose";

const RequestSchema = new mongoose.Schema(
  {
    status: {
      type: String,
      enum: ["pending", "accepted", "rejected"],
      default: "pending",
    },

    sender: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
    reciver: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);
const Request = mongoose.model("Request", RequestSchema);
export default Request;
