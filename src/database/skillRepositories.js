import { errors } from "../helper";
import { Skill } from "../schemas/skill";
import regeneratorRuntime from "regenerator-runtime";

const create = async (newSkill) => {
  return await Skill.create(newSkill).catch((err) => {
    throw err;
  });
};

const getList = (pageIndex, pageSize) => {
  const skip = pageIndex === 1 ? 0 : (pageIndex - 1) * pageSize;
  return new Promise((resolve, reject) => {
    try {
      Skill.find({}, (error, data) => {
        if (error) {
          reject(errors[404]);
        } else {
          resolve(data);
        }
      })
        .skip(skip)
        .limit(pageSize);
    } catch (error) {
      reject(errors);
    }
  });
};

const update = async (SkillId, SkillUpdateReq) => {
  return await Skill.findByIdAndUpdate(SkillId, SkillUpdateReq).catch((err) => {
    throw err;
  });
};

const deleteSkill = (SkillId) => {
  return new Promise((resolve, reject) => {
    try {
      Skill.findByIdAndDelete(SkillId, (err, data) => {
        if (err) {
          reject(errors[404]);
        } else {
          resolve(data);
        }
      });
    } catch (error) {
      resolve(error);
    }
  });
};

const findBySkillName = (name) => {
  return Skill.findOne({ name: name }).catch((err) => {
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
