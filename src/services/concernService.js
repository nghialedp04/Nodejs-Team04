import { concernRepositories } from "../database/concernRepositories";
import Joi from "joi";
import { errors } from "../helper";
import regeneratorRuntime, { async } from "regenerator-runtime";
import { Concern } from "../schemas/concerns";

const create = (concernCreateReq) => {
  return new Promise(async (resolve, reject) => {
    try {
      const checkConcernCreate = Joi.object({
        title: Joi.string().required().max(255),
        description: Joi.string().required().max(255),
      });

      try {
        await checkConcernCreate.validateAsync(concernCreateReq);
      } catch (err) {
        reject({
          status: 400,
          message: err.details[0].message,
        });
      }

      const newConcern = {
        title: concernCreateReq.title,
        description: concernCreateReq.description,
      };

      const createdConcern = await concernRepositories
        .create(newConcern)
        .catch((err) => {
          throw err;
        });
      resolve(createdConcern);
    } catch (error) {
      reject(error);
    }
  });
};

const getList = (pageIndex, pageSize) => {
  return new Promise(async (resolve, reject) => {
    await concernRepositories
      .getList(pageIndex, pageSize)
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

const getOne = (ConcernId) => {
  return new Promise(async (resolve, reject) => {
    try {
      const concern = await Concern.findById(ConcernId).catch((err) => {
        throw reject(errors.NOT_FOUND);
      });

      if (!concern) {
        reject(errors.NOT_FOUND);
      }

      resolve(concern);
    } catch (error) {
      throw reject(error);
    }
  });
};

const update = (ConcernId, ConcernUpdateReq) => {
  return new Promise(async (resolve, reject) => {
    try {
      const checkConcern = await Concern.findById(ConcernId).catch((err) => {
        throw reject(errors.NOT_FOUND);
      });

      if (!checkConcern) {
        reject(errors.NOT_FOUND);
      }

      const checkConcernUpdate = Joi.object({
        title: Joi.string().required().max(255),
        description: Joi.string().required().max(255),
      });

      try {
        await checkConcernUpdate.validateAsync(ConcernUpdateReq);
      } catch (err) {
        reject({
          status: 400,
          message: err.details[0].message,
        });
      }

      const updateConcern = {
        title: ConcernUpdateReq.title,
        description: ConcernUpdateReq.description,
      };

      await concernRepositories
        .update(ConcernId, updateConcern)
        .catch((err) => {
          throw err;
        });
      resolve(updateConcern);
    } catch (error) {
      reject(error);
    }
  });
};

const deleteConcern = (ConcernId) => {
  return new Promise(async (resolve, reject) => {
    try {
      const checkConcern = await Concern.findById(ConcernId).catch((err) => {
        reject(errors.NOT_FOUND);
      });

      if (!checkConcern) {
        reject(errors.NOT_FOUND);
      }

      await concernRepositories.deleteConcern(ConcernId).catch((err) => {
        throw reject(err);
      });
      resolve();
    } catch (error) {
      reject(error);
    }
  });
};

export const concernService = {
  create,
  getList,
  getOne,
  update,
  deleteConcern,
};
