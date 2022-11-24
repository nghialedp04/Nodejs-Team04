import mongoose from "mongoose";

const Schema = mongoose.Schema;

const OurMainSchema = new Schema(
  {
    name: {
      type: String,
    },
    image: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

export const RoadTo = mongoose.model("ourmains", OurMainSchema);
