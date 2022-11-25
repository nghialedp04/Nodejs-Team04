import Joi from "joi";
import regeneratorRuntime, { async } from "regenerator-runtime";
import { ourmainRepositories } from "../database";
import { errors } from "../helper";
import { Ourmain } from "../schemas/ourMain";

const create = (createOurmainReq, fileUrl) =>
  new Promise(async (resolve, reject) => {
    try {
      const newOurmain = {
        name: createOurmainReq.name,
        image: fileUrl,
      };

      const createdOurmain = await ourmainRepositories
        .create(newOurmain)
        .catch((err) => {
          throw err;
        });
      resolve(createdOurmain);
    } catch (error) {
      reject(error);
    }
  });

const getList = (pageIndex, pageSize) => {
  return new Promise(async (resolve, reject) => {
    await ourmainRepositories
      .getList(pageIndex, pageSize)
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

const getOne = (OurmainId) => {
  return new Promise(async (resolve, reject) => {
    const ourmain = await Ourmain.findById(OurmainId).catch(() => {
      reject(errors.NOT_FOUND);
    });
    if (!ourmain) {
      reject(errors.NOT_FOUND);
    }
    resolve(ourmain);
  });
};

const update = (OurmainId, OurmainUpdateReq, fileUrl=null) => {
  return new Promise(async (resolve, reject) => {
    try {
      const checkOurmain = await Ourmain.findById(OurmainId).catch(() => {
        throw reject(errors.NOT_FOUND);
      });
      if (!checkOurmain) {
        reject(errors.NOT_FOUND);
      }

      const checkOurmainUpdate = Joi.object({
        name: Joi.string().required().max(255),
      });

      await checkOurmainUpdate.validateAsync(OurmainUpdateReq).catch((err) => {
        reject({
          Status: 400,
          Message: err.details[0].message,
        });
      });

      const OurmainName = await ourmainRepositories
        .findByOurmainName(OurmainUpdateReq.name)
        .catch((err) => {
          throw err;
        });

      if (OurmainName && OurmainName._id != OurmainId) {
        return reject(errors.EXIST_NAME);
      }

      if (fileUrl !== undefined) {
        var updatedOurmain = {
          name: OurmainUpdateReq.name,
          image: fileUrl,
        };
      } else {
        var updatedOurmain = {
          name: OurmainUpdateReq.name,
          image: checkOurmain.image,
        };
      }

      ourmainRepositories.update(OurmainId, updatedOurmain).catch((err) => {
        throw err;
      });
      resolve(updatedOurmain);
    } catch (error) {
      reject(error);
    }
  });
};

const deleteOurmain = (OurmainId) => {
  return new Promise(async (resolve, reject) => {
    try {
      const checkOurmain = await Ourmain.findById(OurmainId).catch(() => {
        throw reject(errors.NOT_FOUND);
      });

      if (!checkOurmain) {
        reject(errors.NOT_FOUND);
      }

      await ourmainRepositories.deleteOurmain(OurmainId).catch((err) => {
        throw err;
      });
      resolve();
    } catch (error) {
      reject(error);
    }
  });
};

export const ourmainService = {
  create,
  getList,
  getOne,
  update,
  deleteOurmain,
};
