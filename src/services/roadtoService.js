import Joi from "joi";
import regeneratorRuntime, { async } from "regenerator-runtime";
import { roadtoRepositories } from "../database";
import { errors } from "../helper";
import { RoadTo } from "../schemas/roadToDevplus";

const create = (createRoadtoReq) =>
  new Promise(async (resolve, reject) => {
    try {
      const checkRoadtoCreate = Joi.object({
        name: Joi.string().required().max(255),
      });
      await checkRoadtoCreate.validateAsync(createRoadtoReq).catch((err) => {
        reject({
          status: 400,
          message: err.details[0].message,
        });
      });

      const foundRoadto = await roadtoRepositories
        .findByRoadtoName(createRoadtoReq.name)
        .catch((err) => {
          throw err;
        });

      if (foundRoadto) {
        return reject(errors.EXIST_NAME);
      }

      const newRoadto = {
        name: createRoadtoReq.name,
      };

      const createdRoadto = await roadtoRepositories
        .create(newRoadto)
        .catch((err) => {
          throw err;
        });

      resolve(createdRoadto);
    } catch (error) {
      reject(error);
    }
  });

const getList = (pageIndex, pageSize) => {
  return new Promise(async (resolve, reject) => {
    await roadtoRepositories
      .getList(pageIndex, pageSize)
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

const getOne = (RoadtoId) => {
  return new Promise(async (resolve, reject) => {
    const Roadto = await RoadTo.findById(RoadtoId).catch(() => {
      reject(errors.NOT_FOUND);
    });

    if (!Roadto) {
      reject(errors.NOT_FOUND);
    }
    resolve(Roadto);
  });
};

const update = (RoadtoId, RoadtoUpdateReq, fileUrl=null) => {
  return new Promise(async (resolve, reject) => {
    try {
      const checkRoadto = await RoadTo.findById(RoadtoId).catch(() => {
        throw reject(errors.NOT_FOUND);
      });
      if (!checkRoadto) {
        reject(errors.NOT_FOUND);
      }
      
      const checkRoadtoUpdate = Joi.object({
        name: Joi.string().required().max(255),
      });
      
      checkRoadtoUpdate.validateAsync(RoadtoUpdateReq).catch((err) => {
        reject({
          Status: 400,
          Message: err.details[0].message,
        });
      });
      
      const RoadtoName = await roadtoRepositories
      .findByRoadtoName(RoadtoUpdateReq.name)
      .catch((err) => {
        throw err;
      });
      
      if (RoadtoName && RoadtoName._id != RoadtoId) {
        return reject(errors.EXIST_NAME);
      }
      const updatedRoadto = {
        name: RoadtoUpdateReq.name,
      };

      roadtoRepositories.update(RoadtoId, updatedRoadto).catch((err) => {
        throw err;
      });
      resolve(updatedRoadto);
    } catch (error) {
      reject(error);
    }
  });
};

const deleteRoadto = (RoadtoId) => {
  return new Promise(async (resolve, reject) => {
    try {
      const checkRoadto = await RoadTo.findById(RoadtoId).catch(() => {
        throw reject(errors.NOT_FOUND);
      });

      if (!checkRoadto) {
        reject(errors.NOT_FOUND);
      }

      await roadtoRepositories.deleteRoadto(RoadtoId).catch(() => {
        throw err;
      });
      resolve();
    } catch (error) {
      reject(error);
    }
  });
};

export const roadtoService = {
  create,
  getList,
  getOne,
  deleteRoadto,
  update,
};
