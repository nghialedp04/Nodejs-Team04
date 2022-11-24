import mongoose from "mongoose";

const Schema = mongoose.Schema;

const ConcernSchema = new Schema(
  {
    title: {
      type: String,
    },
    description: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

export const Concern = mongoose.model("concerns", ConcernSchema);
