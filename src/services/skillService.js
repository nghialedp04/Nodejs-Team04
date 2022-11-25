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

const update = (SkillId, SkillUpdateReq, fileUrl) => {
  return new Promise(async (resolve, reject) => {
    try {
      await Skill.findById(SkillId)
        .then(() => {
          const checkSkillUpdate = Joi.object({
            name: Joi.string().required().max(255),
            description: Joi.string().required().max(255),
            image: Joi.string(),
            _id: Joi.string().required(),
          });

          try {
            checkSkillUpdate.validateAsync(SkillUpdateReq);
          } catch (err) {
            reject({
              status: 400,
              message: err.details[0].message,
            });
          }
          const SkillName = skillRepositories
            .findBySkillName(SkillUpdateReq.name)
            .catch((err) => {
              throw err;
            });

          if (SkillName && SkillName._id != SkillUpdateReq._id) {
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
            };
          }

          skillRepositories.update(SkillId, updateSkill).catch((err) => {
            throw err;
          });
          resolve(updateSkill);
        })
        .catch((err) => {
          reject(errors.NOT_FOUND);
        });
    } catch (error) {
      reject(error);
    }
  });
};

const deleteSkill = (SkillId) =>
  new Promise(async (resolve, reject) => {
    try {
      await Skill.findById(SkillId)
        .then(() => {
          skillRepositories.deleteSkill(SkillId).catch((err) => {
            reject(err);
          });
          resolve();
        })
        .catch((err) => {
          reject(errors.NOT_FOUND);
        });
      resolve();
    } catch (error) {
      reject(error);
    }
  });

export const skillService = {
  create,
  update,
  getList,
  deleteSkill,
};
