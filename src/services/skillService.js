import { skillRepositories } from "../database";
import { errors } from "../helper";
import Joi from "joi";
import regeneratorRuntime, { async } from "regenerator-runtime";
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
  return new Promise(async (resolve, reject) => {
    await skillRepositories
      .getList(pageIndex, pageSize)
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

const getOne = (SkillId) => {
  return new Promise(async (resolve, reject) => {
    const skill = await Skill.findById(SkillId).catch(() => {
      reject(errors.NOT_FOUND);
    });

    if (!skill) {
      reject(errors.NOT_FOUND);
    }
    resolve(skill);
  });
};

const update = (SkillId, SkillUpdateReq, fileUrl) => {
  return new Promise(async (resolve, reject) => {
    try {
      const checkSkill = await Skill.findById(SkillId).catch(() => {
        throw reject(errors.NOT_FOUND);
      });

      if (!checkSkill) {
        reject(errors.NOT_FOUND);
      }

      const checkSkillUpdate = Joi.object({
        name: Joi.string().required().max(255),
        description: Joi.string().required().max(255),
      });

      await checkSkillUpdate.validateAsync(SkillUpdateReq).catch((err) => {
        reject({
          Status: 400,
          Message: err.details[0].message,
        });
      });

      const SkillName = await skillRepositories
        .findBySkillName(SkillUpdateReq.name)
        .catch((err) => {
          throw err;
        });

      if (SkillName && SkillName._id != SkillId) {
        return reject(errors.EXIST_NAME);
      }

      if (fileUrl !== undefined) {
        var updateSkill = {
          name: SkillUpdateReq.name,
          description: SkillUpdateReq.description,
          image: fileUrl,
        };
      } else {
        var updateSkill = {
          name: SkillUpdateReq.name,
          description: SkillUpdateReq.description,
          image: checkSkill.image,
        };
      }

      skillRepositories.update(SkillId, updateSkill).catch((err) => {
        throw err;
      });
      resolve(updateSkill);
    } catch (error) {
      reject(error);
    }
  });
};

const deleteSkill = (SkillId) => {
  return new Promise(async (resolve, reject) => {
    try {
      const checkSkill = await Skill.findById(SkillId).catch(() => {
        throw reject(errors.NOT_FOUND);
      });

      if (!checkSkill) {
        reject(errors.NOT_FOUND);
      }

      await skillRepositories.deleteSkill(SkillId).catch(() => {
        throw err;
      });
      resolve();
    } catch (error) {
      reject(error);
    }
  });
};

export const skillService = {
  create,
  update,
  getOne,
  getList,
  deleteSkill,
};
