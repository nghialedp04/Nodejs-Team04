import { skillRepositories } from "../database";
import { errors } from "../helper";
import Joi from "joi";
import regeneratorRuntime from "regenerator-runtime";
import { Skill } from "../schemas/skill";

const create = (skillCreateReq, fileUrl) =>
  new Promise(async (resolve, reject) => {
    try {
      const checkSkillCreate = Joi.object({
        name: Joi.string().required().max(255),
        description: Joi.string().required().max(255),
        image: Joi.string(),
      });

      try {
        await checkSkillCreate.validateAsync(skillCreateReq);
      } catch (err) {
        reject({
          status: 400,
          message: err.details[0].message,
        });
      }
      const foundSkill = await skillRepositories
        .findBySkillName(skillCreateReq.name)
        .catch((err) => {
          throw err;
        });

      if (foundSkill) {
        return reject(errors.EXIST_NAME);
      }
      const newSkill = {
        name: skillCreateReq.name,
        description: skillCreateReq.description,
        image: fileUrl,
      };

      const createdSkill = await skillRepositories
        .create(newSkill)
        .catch((err) => {
          throw err;
        });
      resolve(createdSkill);
    } catch (error) {
      reject(error);
    }
  });

const getList = (pageIndex, pageSize) => {
  return new Promise((resolve, reject) => {
    skillRepositories
      .getList(pageIndex, pageSize)
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

const update = (SkillId, SkillUpdateReq) =>
  new Promise(async (resolve, reject) => {
    try {
      const checkSkillUpdate = Joi.object({
        name: Joi.string().required().max(255),
        description: Joi.string().required().max(255),
        image: Joi.string().required().max(255),
        id: Joi.string().required(),
      });

      try {
        await checkSkillUpdate.validateAsync(SkillUpdateReq);
      } catch (err) {
        reject({
          status: 400,
          message: err.details[0].message,
        });
      }
      const SkillName = await skillRepositories
        .findBySkillName(SkillCreateReq.name)
        .catch((err) => {
          throw err;
        });

      if (SkillName) {
        return reject(errors.EXIST_NAME);
      }

      const newSkill = {
        name: SkillCreateReq.name,
        description: SkillCreateReq.description,
        image: SkillCreateReq.image,
      };
      await skillRepositories.update(SkillId, SkillUpdateReq).catch((err) => {
        throw err;
      });
      resolve(createdSkill);
    } catch (error) {
      reject(error);
    }
  });

const deleteSkill = (SkillId) => {
  return new Promise((resolve, reject) => {
    if (SkillId) {
      skillRepositories
        .deleteUser(SkillId)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    } else {
      reject(errors);
    }
  });
};

export const skillService = {
  create,
  update,
  getList,
  deleteSkill,
};
