import mongoose from "mongoose";

const Schema = mongoose.Schema;

const SkillSchema = new Schema(
  {
    name: {
      type: String,
      length: 255,
      unique: true,
    },
    description: {
      type: String,
      length: 255,
    },
    image: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

export const Skill = mongoose.model("skills", SkillSchema);
