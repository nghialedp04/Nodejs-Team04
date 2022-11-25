import { alumniRepositories } from "../database";
import { errors } from "../helper";
import Joi from "joi";
import regeneratorRuntime, { async } from "regenerator-runtime";
import { Alumni } from "../schemas/alumni";

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

const getOne = (AlumniId) => {
  return new Promise(async (resolve, reject) => {
    try {
      const checkAlumni = await Alumni.findById(AlumniId).catch(() => {
        throw reject(errors.NOT_FOUND);
      });

      if (!checkAlumni) {
        reject(errors.NOT_FOUND);
      }
      resolve(checkAlumni);
    } catch (error) {
      reject(error);
    }
  });
};

const deleteAlumni = (AlumniId) => {
  return new Promise(async (resolve, reject) => {
    try {
      const checkAlumni = await Alumni.findById(AlumniId).catch(() => {
        reject(errors.NOT_FOUND);
      });

      if (!checkAlumni) {
        reject(errors.NOT_FOUND);
      }
      await alumniRepositories.deleteAlumni(AlumniId).catch((err) => {
        throw err;
      });
      resolve();
    } catch (error) {
      reject(error);
    }
  });
};

const update = (AlumniId, AlumniUpdateReq, fileUrl) => {
  return new Promise(async (resolve, reject) => {
    try {
      const checkAlumni = await Alumni.findById(AlumniId).catch(() => {
        throw reject(errors.NOT_FOUND);
      });

      if (!checkAlumni) {
        reject(errors.NOT_FOUND);
      }

      const checkAlumniUpdate = Joi.object({
        name: Joi.string().required().max(255),
        position: Joi.string().required().max(255),
        saying: Joi.string().required().max(255),
      });

      await checkAlumniUpdate.validateAsync(AlumniUpdateReq).catch((err) => {
        reject({
          Status: 400,
          Message: err.details[0].message,
        });
      });

      const AlumniName = await alumniRepositories
        .findByAlumniName(AlumniUpdateReq.name)
        .catch((err) => {
          throw err;
        });

      if (AlumniName && AlumniName._id != AlumniId) {
        return reject(errors.EXIST_NAME);
      }

      if (fileUrl !== undefined) {
        var updateAlumni = {
          name: AlumniUpdateReq.name,
          position: AlumniUpdateReq.position,
          saying: AlumniUpdateReq.saying,
          image: fileUrl,
        };
      } else {
        var updateAlumni = {
          name: AlumniUpdateReq.name,
          position: AlumniUpdateReq.position,
          saying: AlumniUpdateReq.saying,
          image: checkAlumni.image,
        };
      }

      alumniRepositories.update(AlumniId, updateAlumni).catch((err) => {
        throw err;
      });
      resolve(updateAlumni);
    } catch (error) {
      reject(error);
    }
  });
};

export const alumniService = {
  create,
  getList,
  getOne,
  deleteAlumni,
  update,
};
