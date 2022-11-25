import { errors } from "../helper";
import { Skill } from "../schemas/skill";
import regeneratorRuntime, { async } from "regenerator-runtime";

const create = async (newSkill) => {
  return await Skill.create(newSkill).catch((err) => {
    throw err;
  });
};

const getList = async (pageIndex, pageSize) => {
  const skip = +pageIndex === 1 ? 0 : (+pageIndex - 1) * +pageSize;
  return await Skill.find({})
    .skip(skip)
    .limit(+pageSize)
    .catch((err) => {
      throw err;
    });
};

const update = async (SkillId, SkillUpdateReq) => {
  return await Skill.findByIdAndUpdate(SkillId, SkillUpdateReq).catch((err) => {
    throw err;
  });
};

const deleteSkill = async (SkillId) => {
  return await Skill.findByIdAndDelete(SkillId).catch((err) => {
    throw err;
  });
};

const findBySkillName = async (name) => {
  return await Skill.findOne({ name: name }).catch((err) => {
    throw err;
  });
};

export const skillRepositories = {
  create,
  getList,
  update,
  deleteSkill,
  findBySkillName,
};
