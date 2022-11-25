import mongoose from "mongoose";

const Schema = mongoose.Schema;

const RoadToSchema = new Schema(
  {
    name: {
      type: String,
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);

export const RoadTo = mongoose.model("roadtos", RoadToSchema);
