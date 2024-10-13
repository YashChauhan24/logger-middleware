import mongoose from "mongoose";

const logSchema = new mongoose.Schema(
  {
    endpoint: {
      type: String,
      required: true,
    },
    method: {
      type: String,
      required: true,
    },
    ip: {
      type: String,
      required: true,
    },
    timestamp: {
      type: Date,
      default: Date.now,
    },
    status: {
      type: String,
      enum: ["Success", "Error"],
      required: true,
    },
    browser: {
      type: String,
      default: null,
    },
    response: {
      type: String,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

const LogModel = mongoose.model("Log", logSchema);
export default LogModel;
