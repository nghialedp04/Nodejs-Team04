import regeneratorRuntime, { async } from "regenerator-runtime";
import { roadtoRepositories } from "../database";

const create = (createRoadtoReq) =>
  new Promise(async (resolve, reject) => {
    try {
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

export const roadtoService = {
  create,
  getList,
};
