import mongoose from "mongoose";

const Schema = mongoose.Schema;

const MenuBarImgSchema = new Schema(
  {
    name: {
      type: String,
    },
    position: {
      type: String,
    },
    image: {
      type: String,
    },
    saying: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

export const MenuBarIMG = mongoose.model("menubarimages", MenuBarImgSchema);
