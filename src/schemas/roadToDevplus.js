import mongoose from "mongoose";

const Schema = mongoose.Schema;

const RoadToSchema = new Schema(
  {
    name: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

export const RoadTo = mongoose.model("roadtos", RoadToSchema);
