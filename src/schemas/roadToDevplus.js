import mongoose from "mongoose";

const Schema = mongoose.Schema;

const RoadToSchema = new Schema(
  {
    name: {
      type: String,
    },
    number: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);

export const RoadTo = mongoose.model("roadtos", RoadToSchema);
