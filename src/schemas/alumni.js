import mongoose from "mongoose";

const Schema = mongoose.Schema;

const AlumniSchema = new Schema(
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

export const Alumni = mongoose.model("alumnies", AlumniSchema);
