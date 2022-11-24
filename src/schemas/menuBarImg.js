import mongoose from "mongoose";

const Schema = mongoose.Schema;

const MenuBarImgSchema = new Schema(
  {
    image: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

export const MenuBarIMG = mongoose.model("menubarimages", MenuBarImgSchema);
