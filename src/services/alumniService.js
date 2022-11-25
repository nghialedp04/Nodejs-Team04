import { alumniRepositories, skillRepositories } from "../database";
import { errors } from "../helper";
import Joi from "joi";
import regeneratorRuntime, { async } from "regenerator-runtime";

const create = (alumniCreateReq, fileUrl) =>
  new Promise(async (resolve, reject) => {
    try {
      const checkAlumniCreate = Joi.object({
        name: Joi.string().required().max(255),
        saying: Joi.string().required().max(255),
        position: Joi.string().required().max(255),
        image: Joi.string(),
      });

      try {
        await checkAlumniCreate.validateAsync(alumniCreateReq);
      } catch (err) {
        reject({
          status: 400,
          message: err.details[0].message,
        });
      }
      const foundAlumni = await alumniRepositories
        .findByAlumniName(alumniCreateReq.name)
        .catch((err) => {
          throw err;
        });

      if (foundAlumni) {
        return reject(errors.EXIST_NAME);
      }

      const newAlumni = {
        name: alumniCreateReq.name,
        saying: alumniCreateReq.saying,
        position: alumniCreateReq.position,
        image: fileUrl,
      };

      const createdAlumni = await alumniRepositories
        .create(newAlumni)
        .catch((err) => {
          throw err;
        });
      resolve(createdAlumni);
    } catch (error) {
      reject(error);
    }
  });

const getList = (pageIndex, pageSize) => {
  return new Promise(async (resolve, reject) => {
    await alumniRepositories
      .getList(pageIndex, pageSize)
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const alumniService = {
  create,
  getList,
};
